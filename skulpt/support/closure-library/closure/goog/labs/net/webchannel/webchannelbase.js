// Copyright 2006 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Base WebChannel implementation.
 *
 */


goog.provide('goog.labs.net.webChannel.WebChannelBase');

goog.require('goog.Uri');
goog.require('goog.array');
goog.require('goog.asserts');
goog.require('goog.debug.TextFormatter');
goog.require('goog.json');
goog.require('goog.json.EvalJsonProcessor');
goog.require('goog.labs.net.webChannel.BaseTestChannel');
goog.require('goog.labs.net.webChannel.Channel');
goog.require('goog.labs.net.webChannel.WebChannelDebug');
goog.require('goog.labs.net.webChannel.WebChannelRequest');
goog.require('goog.labs.net.webChannel.requestStats');
goog.require('goog.labs.net.webChannel.requestStats.Stat');
goog.require('goog.log');
goog.require('goog.net.XhrIo');
goog.require('goog.net.tmpnetwork');
goog.require('goog.string');
goog.require('goog.structs');
goog.require('goog.structs.CircularBuffer');

goog.scope(function() {
var BaseTestChannel = goog.labs.net.webChannel.BaseTestChannel;
var WebChannelDebug = goog.labs.net.webChannel.WebChannelDebug;
var WebChannelRequest = goog.labs.net.webChannel.WebChannelRequest;
var requestStats = goog.labs.net.webChannel.requestStats;



/**
 * This WebChannel implementation is branched off goog.net.BrowserChannel
 * for now. Ongoing changes to goog.net.BrowserChannel will be back
 * ported to this implementation as needed.
 *
 * @param {string=} opt_clientVersion An application-specific version number
 *        that is sent to the server when connected.
 * @param {!Array.<string>=} opt_firstTestResults Previously determined results
 *        of the first channel test.
 * @param {boolean=} opt_secondTestResults Previously determined results
 *        of the second channel test.
 * @constructor
 * @implements {goog.labs.net.webChannel.Channel}
 */
goog.labs.net.webChannel.WebChannelBase = function(
    opt_clientVersion, opt_firstTestResults, opt_secondTestResults) {
  /**
   * The application specific version that is passed to the server.
   * @private {?string}
   */
  this.clientVersion_ = opt_clientVersion || null;

  /**
   * An array of queued maps that need to be sent to the server.
   * @private {!Array.<goog.labs.net.webChannel.WebChannelBase.QueuedMap>}
   */
  this.outgoingMaps_ = [];

  /**
   * An array of dequeued maps that we have either received a non-successful
   * response for, or no response at all, and which therefore may or may not
   * have been received by the server.
   * @private {!Array.<goog.labs.net.webChannel.WebChannelBase.QueuedMap>}
   */
  this.pendingMaps_ = [];

  /**
   * The channel debug used for logging
   * @private {!WebChannelDebug}
   */
  this.channelDebug_ = new WebChannelDebug();

  /**
   * Parser for a response payload. Defaults to use
   * {@code goog.json.unsafeParse}. The parser should return an array.
   * @private {!goog.string.Parser}
   */
  this.parser_ = new goog.json.EvalJsonProcessor(null, true);

  /**
   * An array of results for the first test call.
   * @private {Array.<string>}
   */
  this.firstTestResults_ = opt_firstTestResults || null;

  /**
   * The results of the second test. True implies the
   * connection is buffered, False means unbuffered, null means that
   * the results are not available.
   * @private {?boolean}
   */
  this.secondTestResults_ = goog.isDefAndNotNull(opt_secondTestResults) ?
      opt_secondTestResults : null;

  /**
   * Extra HTTP headers to add to all the requests sent to the server.
   * @private {Object}
   */
  this.extraHeaders_ = null;

  /**
   * Extra parameters to add to all the requests sent to the server.
   * @private {Object}
   */
  this.extraParams_ = null;

  /**
   * The current ChannelRequest object for the forwardchannel.
   * @private {WebChannelRequest}
   */
  this.forwardChannelRequest_ = null;

  /**
   * The ChannelRequest object for the backchannel.
   * @private {WebChannelRequest}
   */
  this.backChannelRequest_ = null;

  /**
   * The relative path (in the context of the the page hosting the browser
   * channel) for making requests to the server.
   * @private {?string}
   */
  this.path_ = null;

  /**
   * The absolute URI for the forwardchannel request.
   * @private {goog.Uri}
   */
  this.forwardChannelUri_ = null;

  /**
   * The absolute URI for the backchannel request.
   * @private {goog.Uri}
   */
  this.backChannelUri_ = null;

  /**
   * A subdomain prefix for using a subdomain in IE for the backchannel
   * requests.
   * @private {?string}
   */
  this.hostPrefix_ = null;

  /**
   * Whether we allow the use of a subdomain in IE for the backchannel requests.
   * @private {boolean}
   */
  this.allowHostPrefix_ = true;

  /**
   * The next id to use for the RID (request identifier) parameter. This
   * identifier uniquely identifies the forward channel request.
   * @private {number}
   */
  this.nextRid_ = 0;

  /**
   * The id to use for the next outgoing map. This identifier uniquely
   * identifies a sent map.
   * @private {number}
   */
  this.nextMapId_ = 0;

  /**
   * Whether to fail forward-channel requests after one try or a few tries.
   * @private {boolean}
   */
  this.failFast_ = false;

  /**
   * The handler that receive callbacks for state changes and data.
   * @private {goog.labs.net.webChannel.WebChannelBase.Handler}
   */
  this.handler_ = null;

  /**
   * Timer identifier for asynchronously making a forward channel request.
   * @private {?number}
   */
  this.forwardChannelTimerId_ = null;

  /**
   * Timer identifier for asynchronously making a back channel request.
   * @private {?number}
   */
  this.backChannelTimerId_ = null;

  /**
   * Timer identifier for the timer that waits for us to retry the backchannel
   * in the case where it is dead and no longer receiving data.
   * @private {?number}
   */
  this.deadBackChannelTimerId_ = null;

  /**
   * The TestChannel object which encapsulates the logic for determining
   * interesting network conditions about the client.
   * @private {BaseTestChannel}
   */
  this.connectionTest_ = null;

  /**
   * Whether the client's network conditions can support chunked responses.
   * @private {?boolean}
   */
  this.useChunked_ = null;

  /**
   * Whether chunked mode is allowed. In certain debugging situations, it's
   * useful to disable this.
   * @private {boolean}
   */
  this.allowChunkedMode_ = true;

  /**
   * The array identifier of the last array received from the server for the
   * backchannel request.
   * @private {number}
   */
  this.lastArrayId_ = -1;

  /**
   * The array id of the last array sent by the server that we know about.
   * @private {number}
   */
  this.lastPostResponseArrayId_ = -1;

  /**
   * The last status code received.
   * @private {number}
   */
  this.lastStatusCode_ = -1;

  /**
   * Number of times we have retried the current forward channel request.
   * @private {number}
   */
  this.forwardChannelRetryCount_ = 0;

  /**
   * Number of times in a row that we have retried the current back channel
   * request and received no data.
   * @private {number}
   */
  this.backChannelRetryCount_ = 0;

  /**
   * The attempt id for the current back channel request. Starts at 1 and
   * increments for each reconnect. The server uses this to log if our
   * connection is flaky or not.
   * @private {number}
   */
  this.backChannelAttemptId_ = 0;

  /**
   * The base part of the time before firing next retry request. Default is 5
   * seconds. Note that a random delay is added (see {@link retryDelaySeedMs_})
   * for all retries, and linear backoff is applied to the sum for subsequent
   * retries.
   * @private {number}
   */
  this.baseRetryDelayMs_ = 5 * 1000;

  /**
   * A random time between 0 and this number of MS is added to the
   * {@link baseRetryDelayMs_}. Default is 10 seconds.
   * @private {number}
   */
  this.retryDelaySeedMs_ = 10 * 1000;

  /**
   * Maximum number of attempts to connect to the server for forward channel
   * requests. Defaults to 2.
   * @private {number}
   */
  this.forwardChannelMaxRetries_ = 2;

  /**
   * The timeout in milliseconds for a forward channel request. Defaults to 20
   * seconds. Note that part of this timeout can be randomized.
   * @private {number}
   */
  this.forwardChannelRequestTimeoutMs_ = 20 * 1000;

  /**
   * A throttle time in ms for readystatechange events for the backchannel.
   * Useful for throttling when ready state is INTERACTIVE (partial data).
   *
   * This throttle is useful if the server sends large data chunks down the
   * backchannel.  It prevents examining XHR partial data on every readystate
   * change event.  This is useful because large chunks can trigger hundreds
   * of readystatechange events, each of which takes ~5ms or so to handle,
   * in turn making the UI unresponsive for a significant period.
   *
   * If set to zero no throttle is used.
   * @private {number}
   */
  this.readyStateChangeThrottleMs_ = 0;

  /**
   * Whether cross origin requests are supported for the channel.
   *
   * See {@link goog.net.XhrIo#setWithCredentials}.
   * @private {boolean}
   */
  this.supportsCrossDomainXhrs_ = false;
};

var WebChannelBase = goog.labs.net.webChannel.WebChannelBase;



/**
 * Simple container class for a (mapId, map) pair.
 * @param {number} mapId The id for this map.
 * @param {!Object|!goog.structs.Map} map The map itself.
 * @param {!Object=} opt_context The context associated with the map.
 * @constructor
 */
WebChannelBase.QueuedMap = function(mapId, map, opt_context) {
  /**
   * The id for this map.
   * @type {number}
   */
  this.mapId = mapId;

  /**
   * The map itself.
   * @type {!Object|!goog.structs.Map}
   */
  this.map = map;

  /**
   * The context for the map.
   * @type {Object}
   */
  this.context = opt_context || null;
};


/**
 * The latest protocol version that this class supports. We request this version
 * from the server when opening the connection. Should match
 * LATEST_CHANNEL_VERSION on the server code.
 * @type {number}
 */
WebChannelBase.LATEST_CHANNEL_VERSION = 8;


/**
 * The channel version that we negotiated with the server for this session.
 * Starts out as the version we request, and then is changed to the negotiated
 * version after the initial open.
 * @private {number}
 */
WebChannelBase.prototype.channelVersion_ =
    WebChannelBase.LATEST_CHANNEL_VERSION;


/**
 * Enum type for the channel state machine.
 * @enum {number}
 */
WebChannelBase.State = {
  /** The channel is closed. */
  CLOSED: 0,

  /** The channel has been initialized but hasn't yet initiated a connection. */
  INIT: 1,

  /** The channel is in the process of opening a connection to the server. */
  OPENING: 2,

  /** The channel is open. */
  OPENED: 3
};


/**
 * The current state of the WebChannel.
 * @private {!WebChannelBase.State}
 */
WebChannelBase.prototype.state_ = WebChannelBase.State.INIT;


/**
 * The timeout in milliseconds for a forward channel request.
 * @type {number}
 */
WebChannelBase.FORWARD_CHANNEL_RETRY_TIMEOUT = 20 * 1000;


/**
 * Maximum number of attempts to connect to the server for back channel
 * requests.
 * @type {number}
 */
WebChannelBase.BACK_CHANNEL_MAX_RETRIES = 3;


/**
 * A number in MS of how long we guess the maxmium amount of time a round trip
 * to the server should take. In the future this could be substituted with a
 * real measurement of the RTT.
 * @type {number}
 */
WebChannelBase.RTT_ESTIMATE = 3 * 1000;


/**
 * When retrying for an inactive channel, we will multiply the total delay by
 * this number.
 * @type {number}
 */
WebChannelBase.INACTIVE_CHANNEL_RETRY_FACTOR = 2;


/**
 * Enum type for identifying an error.
 * @enum {number}
 */
WebChannelBase.Error = {
  /** Value that indicates no error has occurred. */
  OK: 0,

  /** An error due to a request failing. */
  REQUEST_FAILED: 2,

  /** An error due to the user being logged out. */
  LOGGED_OUT: 4,

  /** An error due to server response which contains no data. */
  NO_DATA: 5,

  /** An error due to a server response indicating an unknown session id */
  UNKNOWN_SESSION_ID: 6,

  /** An error due to a server response requesting to stop the channel. */
  STOP: 7,

  /** A general network error. */
  NETWORK: 8,

  /** An error due to the channel being blocked by a network administrator. */
  BLOCKED: 9,

  /** An error due to bad data being returned from the server. */
  BAD_DATA: 10,

  /** An error due to a response that is not parsable. */
  BAD_RESPONSE: 11,

  /** ActiveX is blocked by the machine's admin settings. */
  ACTIVE_X_BLOCKED: 12
};


/**
 * Internal enum type for the two channel types.
 * @enum {number}
 * @private
 */
WebChannelBase.ChannelType_ = {
  FORWARD_CHANNEL: 1,

  BACK_CHANNEL: 2
};


/**
 * The maximum number of maps that can be sent in one POST. Should match
 * MAX_MAPS_PER_REQUEST on the server code.
 * @type {number}
 * @private
 */
WebChannelBase.MAX_MAPS_PER_REQUEST_ = 1000;


/**
 * A guess at a cutoff at which to no longer assume the backchannel is dead
 * when we are slow to receive data. Number in bytes.
 *
 * Assumption: The worst bandwidth we work on is 50 kilobits/sec
 * 50kbits/sec * (1 byte / 8 bits) * 6 sec dead backchannel timeout
 * @type {number}
 */
WebChannelBase.OUTSTANDING_DATA_BACKCHANNEL_RETRY_CUTOFF = 37500;


/**
 * Returns the logger.
 *
 * @return {WebChannelDebug} The channel debug object.
 */
WebChannelBase.prototype.getChannelDebug = function() {
  return this.channelDebug_;
};


/**
 * Sets the logger.
 * TODO(user): Add interface for channel loggers or remove this function.
 *
 * @param {!WebChannelDebug} channelDebug The channel debug object.
 */
WebChannelBase.prototype.setChannelDebug = function(channelDebug) {
  this.channelDebug_ = channelDebug;
};


/**
 * Starts the channel. This initiates connections to the server.
 *
 * @param {string} testPath  The path for the test connection.
 * @param {string} channelPath  The path for the channel connection.
 * @param {!Object=} opt_extraParams Extra parameter keys and values to add to
 *     the requests.
 * @param {string=} opt_oldSessionId  Session ID from a previous session.
 * @param {number=} opt_oldArrayId  The last array ID from a previous session.
 */
WebChannelBase.prototype.connect = function(testPath, channelPath,
    opt_extraParams, opt_oldSessionId, opt_oldArrayId) {
  this.channelDebug_.debug('connect()');

  requestStats.notifyStatEvent(requestStats.Stat.CONNECT_ATTEMPT);

  this.path_ = channelPath;
  this.extraParams_ = opt_extraParams || {};

  // Attach parameters about the previous session if reconnecting.
  if (opt_oldSessionId && goog.isDef(opt_oldArrayId)) {
    this.extraParams_['OSID'] = opt_oldSessionId;
    this.extraParams_['OAID'] = opt_oldArrayId;
  }

  this.connectTest_(testPath);
};


/**
 * Disconnects and closes the channel.
 */
WebChannelBase.prototype.disconnect = function() {
  this.channelDebug_.debug('disconnect()');

  this.cancelRequests_();

  if (this.state_ == WebChannelBase.State.OPENED) {
    var rid = this.nextRid_++;
    var uri = this.forwardChannelUri_.clone();
    uri.setParameterValue('SID', this.sid_);
    uri.setParameterValue('RID', rid);
    uri.setParameterValue('TYPE', 'terminate');

    // Add the reconnect parameters.
    this.addAdditionalParams_(uri);

    var request = WebChannelRequest.createChannelRequest(
        this, this.channelDebug_, this.sid_, rid);
    request.sendUsingImgTag(uri);
  }

  this.onClose_();
};


/**
 * Returns the session id of the channel. Only available after the
 * channel has been opened.
 * @return {string} Session ID.
 */
WebChannelBase.prototype.getSessionId = function() {
  return this.sid_;
};


/**
 * Starts the test channel to determine network conditions.
 *
 * @param {string} testPath  The relative PATH for the test connection.
 * @private
 */
WebChannelBase.prototype.connectTest_ = function(testPath) {
  this.channelDebug_.debug('connectTest_()');
  if (!this.okToMakeRequest_()) {
    return; // channel is cancelled
  }
  this.connectionTest_ = new BaseTestChannel(this, this.channelDebug_);
  this.connectionTest_.setExtraHeaders(this.extraHeaders_);
  this.connectionTest_.setParser(this.parser_);
  this.connectionTest_.connect(testPath);
};


/**
 * Starts the regular channel which is run after the test channel is complete.
 * @private
 */
WebChannelBase.prototype.connectChannel_ = function() {
  this.channelDebug_.debug('connectChannel_()');
  this.ensureInState_(WebChannelBase.State.INIT, WebChannelBase.State.CLOSED);
  this.forwardChannelUri_ =
      this.getForwardChannelUri(/** @type {string} */ (this.path_));
  this.ensureForwardChannel_();
};


/**
 * Cancels all outstanding requests.
 * @private
 */
WebChannelBase.prototype.cancelRequests_ = function() {
  if (this.connectionTest_) {
    this.connectionTest_.abort();
    this.connectionTest_ = null;
  }

  if (this.backChannelRequest_) {
    this.backChannelRequest_.cancel();
    this.backChannelRequest_ = null;
  }

  if (this.backChannelTimerId_) {
    goog.global.clearTimeout(this.backChannelTimerId_);
    this.backChannelTimerId_ = null;
  }

  this.clearDeadBackchannelTimer_();

  if (this.forwardChannelRequest_) {
    this.forwardChannelRequest_.cancel();
    this.forwardChannelRequest_ = null;
  }

  if (this.forwardChannelTimerId_) {
    goog.global.clearTimeout(this.forwardChannelTimerId_);
    this.forwardChannelTimerId_ = null;
  }
};


/**
 * Returns the extra HTTP headers to add to all the requests sent to the server.
 *
 * @return {Object} The HTTP headers, or null.
 */
WebChannelBase.prototype.getExtraHeaders = function() {
  return this.extraHeaders_;
};


/**
 * Sets extra HTTP headers to add to all the requests sent to the server.
 *
 * @param {Object} extraHeaders The HTTP headers, or null.
 */
WebChannelBase.prototype.setExtraHeaders = function(
    extraHeaders) {
  this.extraHeaders_ = extraHeaders;
};


/**
 * Sets the throttle for handling onreadystatechange events for the request.
 *
 * @param {number} throttle The throttle in ms.  A value of zero indicates
 *     no throttle.
 */
WebChannelBase.prototype.setReadyStateChangeThrottle = function(throttle) {
  this.readyStateChangeThrottleMs_ = throttle;
};


/**
 * Sets whether cross origin requests are supported for the channel.
 *
 * Setting this allows the creation of requests to secondary domains and
 * sends XHRs with the CORS withCredentials bit set to true.
 *
 * In order for cross-origin requests to work, the server will also need to set
 * CORS response headers as per:
 * https://developer.mozilla.org/en-US/docs/HTTP_access_control
 *
 * See {@link goog.net.XhrIo#setWithCredentials}.
 * @param {boolean} supportCrossDomain Whether cross domain XHRs are supported.
 */
WebChannelBase.prototype.setSupportsCrossDomainXhrs =
    function(supportCrossDomain) {
  this.supportsCrossDomainXhrs_ = supportCrossDomain;
};


/**
 * Returns the handler used for channel callback events.
 *
 * @return {WebChannelBase.Handler} The handler.
 */
WebChannelBase.prototype.getHandler = function() {
  return this.handler_;
};


/**
 * Sets the handler used for channel callback events.
 * @param {WebChannelBase.Handler} handler The handler to set.
 */
WebChannelBase.prototype.setHandler = function(handler) {
  this.handler_ = handler;
};


/**
 * Returns whether the channel allows the use of a subdomain. There may be
 * cases where this isn't allowed.
 * @return {boolean} Whether a host prefix is allowed.
 */
WebChannelBase.prototype.getAllowHostPrefix = function() {
  return this.allowHostPrefix_;
};


/**
 * Sets whether the channel allows the use of a subdomain. There may be cases
 * where this isn't allowed, for example, logging in with troutboard where
 * using a subdomain causes Apache to force the user to authenticate twice.
 * @param {boolean} allowHostPrefix Whether a host prefix is allowed.
 */
WebChannelBase.prototype.setAllowHostPrefix = function(allowHostPrefix) {
  this.allowHostPrefix_ = allowHostPrefix;
};


/**
 * Returns whether the channel is buffered or not. This state is valid for
 * querying only after the test connection has completed. This may be
 * queried in the WebChannelBase.okToMakeRequest() callback.
 * A channel may be buffered if the test connection determines that
 * a chunked response could not be sent down within a suitable time.
 * @return {boolean} Whether the channel is buffered.
 */
WebChannelBase.prototype.isBuffered = function() {
  return !this.useChunked_;
};


/**
 * Returns whether chunked mode is allowed. In certain debugging situations,
 * it's useful for the application to have a way to disable chunked mode for a
 * user.

 * @return {boolean} Whether chunked mode is allowed.
 */
WebChannelBase.prototype.getAllowChunkedMode = function() {
  return this.allowChunkedMode_;
};


/**
 * Sets whether chunked mode is allowed. In certain debugging situations, it's
 * useful for the application to have a way to disable chunked mode for a user.
 * @param {boolean} allowChunkedMode  Whether chunked mode is allowed.
 */
WebChannelBase.prototype.setAllowChunkedMode = function(allowChunkedMode) {
  this.allowChunkedMode_ = allowChunkedMode;
};


/**
 * Sends a request to the server. The format of the request is a Map data
 * structure of key/value pairs. These maps are then encoded in a format
 * suitable for the wire and then reconstituted as a Map data structure that
 * the server can process.
 * @param {!Object|!goog.structs.Map} map The map to send.
 * @param {!Object=} opt_context The context associated with the map.
 */
WebChannelBase.prototype.sendMap = function(map, opt_context) {
  goog.asserts.assert(this.state_ != WebChannelBase.State.CLOSED,
      'Invalid operation: sending map when state is closed');

  // We can only send 1000 maps per POST, but typically we should never have
  // that much to send, so warn if we exceed that (we still send all the maps).
  if (this.outgoingMaps_.length == WebChannelBase.MAX_MAPS_PER_REQUEST_) {
    // severe() is temporary so that we get these uploaded and can figure out
    // what's causing them. Afterwards can change to warning().
    this.channelDebug_.severe(
        'Already have ' + WebChannelBase.MAX_MAPS_PER_REQUEST_ +
        ' queued maps upon queueing ' + goog.json.serialize(map));
  }

  this.outgoingMaps_.push(
      new WebChannelBase.QueuedMap(this.nextMapId_++, map, opt_context));
  if (this.state_ == WebChannelBase.State.OPENING ||
      this.state_ == WebChannelBase.State.OPENED) {
    this.ensureForwardChannel_();
  }
};


/**
 * When set to true, this changes the behavior of the forward channel so it
 * will not retry requests; it will fail after one network failure, and if
 * there was already one network failure, the request will fail immediately.
 * @param {boolean} failFast  Whether or not to fail fast.
 */
WebChannelBase.prototype.setFailFast = function(failFast) {
  this.failFast_ = failFast;
  this.channelDebug_.info('setFailFast: ' + failFast);
  if ((this.forwardChannelRequest_ || this.forwardChannelTimerId_) &&
      this.forwardChannelRetryCount_ > this.getForwardChannelMaxRetries()) {
    this.channelDebug_.info(
        'Retry count ' + this.forwardChannelRetryCount_ +
        ' > new maxRetries ' + this.getForwardChannelMaxRetries() +
        '. Fail immediately!');
    if (this.forwardChannelRequest_) {
      this.forwardChannelRequest_.cancel();
      // Go through the standard onRequestComplete logic to expose the max-retry
      // failure in the standard way.
      this.onRequestComplete(this.forwardChannelRequest_);
    } else {  // i.e., this.forwardChannelTimerId_
      goog.global.clearTimeout(this.forwardChannelTimerId_);
      this.forwardChannelTimerId_ = null;
      // The error code from the last failed request is gone, so just use a
      // generic one.
      this.signalError_(WebChannelBase.Error.REQUEST_FAILED);
    }
  }
};


/**
 * @return {number} The max number of forward-channel retries, which will be 0
 * in fail-fast mode.
 */
WebChannelBase.prototype.getForwardChannelMaxRetries = function() {
  return this.failFast_ ? 0 : this.forwardChannelMaxRetries_;
};


/**
 * Sets the maximum number of attempts to connect to the server for forward
 * channel requests.
 * @param {number} retries The maximum number of attempts.
 */
WebChannelBase.prototype.setForwardChannelMaxRetries = function(retries) {
  this.forwardChannelMaxRetries_ = retries;
};


/**
 * Sets the timeout for a forward channel request.
 * @param {number} timeoutMs The timeout in milliseconds.
 */
WebChannelBase.prototype.setForwardChannelRequestTimeout = function(timeoutMs) {
  this.forwardChannelRequestTimeoutMs_ = timeoutMs;
};


/**
 * @return {number} The max number of back-channel retries, which is a constant.
 */
WebChannelBase.prototype.getBackChannelMaxRetries = function() {
  // Back-channel retries is a constant.
  return WebChannelBase.BACK_CHANNEL_MAX_RETRIES;
};


/**
 * @override
 */
WebChannelBase.prototype.isClosed = function() {
  return this.state_ == WebChannelBase.State.CLOSED;
};


/**
 * Returns the channel state.
 * @return {WebChannelBase.State} The current state of the channel.
 */
WebChannelBase.prototype.getState = function() {
  return this.state_;
};


/**
 * Return the last status code received for a request.
 * @return {number} The last status code received for a request.
 */
WebChannelBase.prototype.getLastStatusCode = function() {
  return this.lastStatusCode_;
};


/**
 * @return {number} The last array id received.
 */
WebChannelBase.prototype.getLastArrayId = function() {
  return this.lastArrayId_;
};


/**
 * Returns whether there are outstanding requests servicing the channel.
 * @return {boolean} true if there are outstanding requests.
 */
WebChannelBase.prototype.hasOutstandingRequests = function() {
  return this.getOutstandingRequests_() != 0;
};


/**
 * Sets a new parser for the response payload. A custom parser may be set to
 * avoid using eval(), for example. By default, the parser uses
 * {@code goog.json.unsafeParse}.
 * @param {!goog.string.Parser} parser Parser.
 */
WebChannelBase.prototype.setParser = function(parser) {
  this.parser_ = parser;
};


/**
 * Returns the number of outstanding requests.
 * @return {number} The number of outstanding requests to the server.
 * @private
 */
WebChannelBase.prototype.getOutstandingRequests_ = function() {
  var count = 0;
  if (this.backChannelRequest_) {
    count++;
  }
  if (this.forwardChannelRequest_) {
    count++;
  }
  return count;
};


/**
 * Ensures that a forward channel request is scheduled.
 * @private
 */
WebChannelBase.prototype.ensureForwardChannel_ = function() {
  if (this.forwardChannelRequest_) {
    // connection in process - no need to start a new request
    return;
  }

  if (this.forwardChannelTimerId_) {
    // no need to start a new request - one is already scheduled
    return;
  }

  this.forwardChannelTimerId_ = requestStats.setTimeout(
      goog.bind(this.onStartForwardChannelTimer_, this), 0);
  this.forwardChannelRetryCount_ = 0;
};


/**
 * Schedules a forward-channel retry for the specified request, unless the max
 * retries has been reached.
 * @param {WebChannelRequest} request The failed request to retry.
 * @return {boolean} true iff a retry was scheduled.
 * @private
 */
WebChannelBase.prototype.maybeRetryForwardChannel_ =
    function(request) {
  if (this.forwardChannelRequest_ || this.forwardChannelTimerId_) {
    // Should be impossible to be called in this state.
    this.channelDebug_.severe('Request already in progress');
    return false;
  }

  if (this.state_ == WebChannelBase.State.INIT ||  // no retry open_()
      (this.forwardChannelRetryCount_ >= this.getForwardChannelMaxRetries())) {
    return false;
  }

  this.channelDebug_.debug('Going to retry POST');

  this.forwardChannelTimerId_ = requestStats.setTimeout(
      goog.bind(this.onStartForwardChannelTimer_, this, request),
      this.getRetryTime_(this.forwardChannelRetryCount_));
  this.forwardChannelRetryCount_++;
  return true;
};


/**
 * Timer callback for ensureForwardChannel
 * @param {WebChannelRequest=} opt_retryRequest A failed request
 * to retry.
 * @private
 */
WebChannelBase.prototype.onStartForwardChannelTimer_ = function(
    opt_retryRequest) {
  this.forwardChannelTimerId_ = null;
  this.startForwardChannel_(opt_retryRequest);
};


/**
 * Begins a new forward channel operation to the server.
 * @param {WebChannelRequest=} opt_retryRequest A failed request to retry.
 * @private
 */
WebChannelBase.prototype.startForwardChannel_ = function(
    opt_retryRequest) {
  this.channelDebug_.debug('startForwardChannel_');
  if (!this.okToMakeRequest_()) {
    return; // channel is cancelled
  } else if (this.state_ == WebChannelBase.State.INIT) {
    if (opt_retryRequest) {
      this.channelDebug_.severe('Not supposed to retry the open');
      return;
    }
    this.open_();
    this.state_ = WebChannelBase.State.OPENING;
  } else if (this.state_ == WebChannelBase.State.OPENED) {
    if (opt_retryRequest) {
      this.makeForwardChannelRequest_(opt_retryRequest);
      return;
    }

    if (this.outgoingMaps_.length == 0) {
      this.channelDebug_.debug('startForwardChannel_ returned: ' +
                                   'nothing to send');
      // no need to start a new forward channel request
      return;
    }

    if (this.forwardChannelRequest_) {
      // Should be impossible to be called in this state.
      this.channelDebug_.severe('startForwardChannel_ returned: ' +
                                    'connection already in progress');
      return;
    }

    this.makeForwardChannelRequest_();
    this.channelDebug_.debug('startForwardChannel_ finished, sent request');
  }
};


/**
 * Establishes a new channel session with the the server.
 * @private
 */
WebChannelBase.prototype.open_ = function() {
  this.channelDebug_.debug('open_()');
  this.nextRid_ = Math.floor(Math.random() * 100000);

  var rid = this.nextRid_++;
  var request = WebChannelRequest.createChannelRequest(
      this, this.channelDebug_, '', rid);
  request.setExtraHeaders(this.extraHeaders_);
  var requestText = this.dequeueOutgoingMaps_();
  var uri = this.forwardChannelUri_.clone();
  uri.setParameterValue('RID', rid);
  if (this.clientVersion_) {
    uri.setParameterValue('CVER', this.clientVersion_);
  }

  // Add the reconnect parameters.
  this.addAdditionalParams_(uri);

  request.xmlHttpPost(uri, requestText, true);
  this.forwardChannelRequest_ = request;
};


/**
 * Makes a forward channel request using XMLHTTP.
 * @param {!WebChannelRequest=} opt_retryRequest A failed request to retry.
 * @private
 */
WebChannelBase.prototype.makeForwardChannelRequest_ =
    function(opt_retryRequest) {
  var rid;
  var requestText;
  if (opt_retryRequest) {
    this.requeuePendingMaps_();
    rid = this.nextRid_ - 1;  // Must use last RID
    requestText = this.dequeueOutgoingMaps_();
  } else {
    rid = this.nextRid_++;
    requestText = this.dequeueOutgoingMaps_();
  }

  var uri = this.forwardChannelUri_.clone();
  uri.setParameterValue('SID', this.sid_);
  uri.setParameterValue('RID', rid);
  uri.setParameterValue('AID', this.lastArrayId_);
  // Add the additional reconnect parameters.
  this.addAdditionalParams_(uri);

  var request = WebChannelRequest.createChannelRequest(this, this.channelDebug_,
      this.sid_, rid, this.forwardChannelRetryCount_ + 1);
  request.setExtraHeaders(this.extraHeaders_);

  // Randomize from 50%-100% of the forward channel timeout to avoid
  // a big hit if servers happen to die at once.
  request.setTimeout(
      Math.round(this.forwardChannelRequestTimeoutMs_ * 0.50) +
      Math.round(this.forwardChannelRequestTimeoutMs_ * 0.50 * Math.random()));
  this.forwardChannelRequest_ = request;
  request.xmlHttpPost(uri, requestText, true);
};


/**
 * Adds the additional parameters from the handler to the given URI.
 * @param {!goog.Uri} uri The URI to add the parameters to.
 * @private
 */
WebChannelBase.prototype.addAdditionalParams_ = function(uri) {
  // Add the additional reconnect parameters as needed.
  if (this.handler_) {
    var params = this.handler_.getAdditionalParams(this);
    if (params) {
      goog.structs.forEach(params, function(value, key, coll) {
        uri.setParameterValue(key, value);
      });
    }
  }
};


/**
 * Returns the request text from the outgoing maps and resets it.
 * @return {string} The encoded request text created from all the currently
 *                  queued outgoing maps.
 * @private
 */
WebChannelBase.prototype.dequeueOutgoingMaps_ = function() {
  var count = Math.min(this.outgoingMaps_.length,
                       WebChannelBase.MAX_MAPS_PER_REQUEST_);
  var sb = ['count=' + count];
  var offset;
  if (count > 0) {
    // To save a bit of bandwidth, specify the base mapId and the rest as
    // offsets from it.
    offset = this.outgoingMaps_[0].mapId;
    sb.push('ofs=' + offset);
  } else {
    offset = 0;
  }
  for (var i = 0; i < count; i++) {
    var mapId = this.outgoingMaps_[i].mapId;
    var map = this.outgoingMaps_[i].map;
    mapId -= offset;
    try {
      goog.structs.forEach(map, function(value, key, coll) {
        sb.push('req' + mapId + '_' + key + '=' + encodeURIComponent(value));
      });
    } catch (ex) {
      // We send a map here because lots of the retry logic relies on map IDs,
      // so we have to send something.
      sb.push('req' + mapId + '_' + 'type' + '=' +
              encodeURIComponent('_badmap'));
      if (this.handler_) {
        this.handler_.badMapError(this, map);
      }
    }
  }
  this.pendingMaps_ = this.pendingMaps_.concat(
      this.outgoingMaps_.splice(0, count));
  return sb.join('&');
};


/**
 * Requeues unacknowledged sent arrays for retransmission in the next forward
 * channel request.
 * @private
 */
WebChannelBase.prototype.requeuePendingMaps_ = function() {
  this.outgoingMaps_ = this.pendingMaps_.concat(this.outgoingMaps_);
  this.pendingMaps_.length = 0;
};


/**
 * Ensures there is a backchannel request for receiving data from the server.
 * @private
 */
WebChannelBase.prototype.ensureBackChannel_ = function() {
  if (this.backChannelRequest_) {
    // already have one
    return;
  }

  if (this.backChannelTimerId_) {
    // no need to start a new request - one is already scheduled
    return;
  }

  this.backChannelAttemptId_ = 1;
  this.backChannelTimerId_ = requestStats.setTimeout(
      goog.bind(this.onStartBackChannelTimer_, this), 0);
  this.backChannelRetryCount_ = 0;
};


/**
 * Schedules a back-channel retry, unless the max retries has been reached.
 * @return {boolean} true iff a retry was scheduled.
 * @private
 */
WebChannelBase.prototype.maybeRetryBackChannel_ = function() {
  if (this.backChannelRequest_ || this.backChannelTimerId_) {
    // Should be impossible to be called in this state.
    this.channelDebug_.severe('Request already in progress');
    return false;
  }

  if (this.backChannelRetryCount_ >= this.getBackChannelMaxRetries()) {
    return false;
  }

  this.channelDebug_.debug('Going to retry GET');

  this.backChannelAttemptId_++;
  this.backChannelTimerId_ = requestStats.setTimeout(
      goog.bind(this.onStartBackChannelTimer_, this),
      this.getRetryTime_(this.backChannelRetryCount_));
  this.backChannelRetryCount_++;
  return true;
};


/**
 * Timer callback for ensureBackChannel_.
 * @private
 */
WebChannelBase.prototype.onStartBackChannelTimer_ = function() {
  this.backChannelTimerId_ = null;
  this.startBackChannel_();
};


/**
 * Begins a new back channel operation to the server.
 * @private
 */
WebChannelBase.prototype.startBackChannel_ = function() {
  if (!this.okToMakeRequest_()) {
    // channel is cancelled
    return;
  }

  this.channelDebug_.debug('Creating new HttpRequest');
  this.backChannelRequest_ = WebChannelRequest.createChannelRequest(this,
      this.channelDebug_, this.sid_, 'rpc', this.backChannelAttemptId_);
  this.backChannelRequest_.setExtraHeaders(this.extraHeaders_);
  this.backChannelRequest_.setReadyStateChangeThrottle(
      this.readyStateChangeThrottleMs_);
  var uri = this.backChannelUri_.clone();
  uri.setParameterValue('RID', 'rpc');
  uri.setParameterValue('SID', this.sid_);
  uri.setParameterValue('CI', this.useChunked_ ? '0' : '1');
  uri.setParameterValue('AID', this.lastArrayId_);

  // Add the reconnect parameters.
  this.addAdditionalParams_(uri);

  if (!WebChannelRequest.supportsXhrStreaming()) {
    uri.setParameterValue('TYPE', 'html');
    this.backChannelRequest_.tridentGet(uri, Boolean(this.hostPrefix_));
  } else {
    uri.setParameterValue('TYPE', 'xmlhttp');
    this.backChannelRequest_.xmlHttpGet(uri, true /* decodeChunks */,
        this.hostPrefix_, false /* opt_noClose */);
  }
  this.channelDebug_.debug('New Request created');
};


/**
 * Gives the handler a chance to return an error code and stop channel
 * execution. A handler might want to do this to check that the user is still
 * logged in, for example.
 * @private
 * @return {boolean} If it's OK to make a request.
 */
WebChannelBase.prototype.okToMakeRequest_ = function() {
  if (this.handler_) {
    var result = this.handler_.okToMakeRequest(this);
    if (result != WebChannelBase.Error.OK) {
      this.channelDebug_.debug(
          'Handler returned error code from okToMakeRequest');
      this.signalError_(result);
      return false;
    }
  }
  return true;
};


/**
 * @override
 */
WebChannelBase.prototype.testConnectionFinished =
    function(testChannel, useChunked) {
  this.channelDebug_.debug('Test Connection Finished');

  this.useChunked_ = this.allowChunkedMode_ && useChunked;
  this.lastStatusCode_ = testChannel.getLastStatusCode();
  this.connectChannel_();
};


/**
 * @override
 */
WebChannelBase.prototype.testConnectionFailure =
    function(testChannel, errorCode) {
  this.channelDebug_.debug('Test Connection Failed');
  this.lastStatusCode_ = testChannel.getLastStatusCode();
  this.signalError_(WebChannelBase.Error.REQUEST_FAILED);
};


/**
 * @override
 */
WebChannelBase.prototype.testConnectionBlocked =
    function(testChannel) {
  this.channelDebug_.debug('Test Connection Blocked');
  this.lastStatusCode_ = this.connectionTest_.getLastStatusCode();
  this.signalError_(WebChannelBase.Error.BLOCKED);
};


/**
 * @override
 */
WebChannelBase.prototype.onRequestData = function(request, responseText) {
  if (this.state_ == WebChannelBase.State.CLOSED ||
      (this.backChannelRequest_ != request &&
       this.forwardChannelRequest_ != request)) {
    // either CLOSED or a request we don't know about (perhaps an old request)
    return;
  }
  this.lastStatusCode_ = request.getLastStatusCode();

  if (this.forwardChannelRequest_ == request &&
      this.state_ == WebChannelBase.State.OPENED) {
    var response;
    try {
      response = this.parser_.parse(responseText);
    } catch (ex) {
      response = null;
    }
    if (goog.isArray(response) && response.length == 3) {
      this.handlePostResponse_(/** @type {!Array} */ (response));
    } else {
      this.channelDebug_.debug('Bad POST response data returned');
      this.signalError_(WebChannelBase.Error.BAD_RESPONSE);
    }
  } else {
    if (this.backChannelRequest_ == request) {
      this.clearDeadBackchannelTimer_();
    }
    if (!goog.string.isEmpty(responseText)) {
      var response = this.parser_.parse(responseText);
      goog.asserts.assert(goog.isArray(response));
      this.onInput_(/** @type {!Array} */ (response));
    }
  }
};


/**
 * Handles a POST response from the server.
 * @param {Array} responseValues The key value pairs in the POST response.
 * @private
 */
WebChannelBase.prototype.handlePostResponse_ = function(responseValues) {
  // The first response value is set to 0 if server is missing backchannel.
  if (responseValues[0] == 0) {
    this.handleBackchannelMissing_();
    return;
  }
  this.lastPostResponseArrayId_ = responseValues[1];
  var outstandingArrays = this.lastPostResponseArrayId_ - this.lastArrayId_;
  if (0 < outstandingArrays) {
    var numOutstandingBackchannelBytes = responseValues[2];
    this.channelDebug_.debug(numOutstandingBackchannelBytes + ' bytes (in ' +
        outstandingArrays + ' arrays) are outstanding on the BackChannel');
    if (!this.shouldRetryBackChannel_(numOutstandingBackchannelBytes)) {
      return;
    }
    if (!this.deadBackChannelTimerId_) {
      // We expect to receive data within 2 RTTs or we retry the backchannel.
      this.deadBackChannelTimerId_ = requestStats.setTimeout(
          goog.bind(this.onBackChannelDead_, this),
          2 * WebChannelBase.RTT_ESTIMATE);
    }
  }
};


/**
 * Handles a POST response from the server telling us that it has detected that
 * we have no hanging GET connection.
 * @private
 */
WebChannelBase.prototype.handleBackchannelMissing_ = function() {
  // As long as the back channel was started before the POST was sent,
  // we should retry the backchannel. We give a slight buffer of RTT_ESTIMATE
  // so as not to excessively retry the backchannel
  this.channelDebug_.debug('Server claims our backchannel is missing.');
  if (this.backChannelTimerId_) {
    this.channelDebug_.debug('But we are currently starting the request.');
    return;
  } else if (!this.backChannelRequest_) {
    this.channelDebug_.warning(
        'We do not have a BackChannel established');
  } else if (this.backChannelRequest_.getRequestStartTime() +
      WebChannelBase.RTT_ESTIMATE <
      this.forwardChannelRequest_.getRequestStartTime()) {
    this.clearDeadBackchannelTimer_();
    this.backChannelRequest_.cancel();
    this.backChannelRequest_ = null;
  } else {
    return;
  }
  this.maybeRetryBackChannel_();
  requestStats.notifyStatEvent(requestStats.Stat.BACKCHANNEL_MISSING);
};


/**
 * Determines whether we should start the process of retrying a possibly
 * dead backchannel.
 * @param {number} outstandingBytes The number of bytes for which the server has
 *     not yet received acknowledgement.
 * @return {boolean} Whether to start the backchannel retry timer.
 * @private
 */
WebChannelBase.prototype.shouldRetryBackChannel_ = function(
    outstandingBytes) {
  // Not too many outstanding bytes, not buffered and not after a retry.
  return outstandingBytes <
      WebChannelBase.OUTSTANDING_DATA_BACKCHANNEL_RETRY_CUTOFF &&
      !this.isBuffered() &&
      this.backChannelRetryCount_ == 0;
};


/**
 * Decides which host prefix should be used, if any.  If there is a handler,
 * allows the handler to validate a host prefix provided by the server, and
 * optionally override it.
 * @param {?string} serverHostPrefix The host prefix provided by the server.
 * @return {?string} The host prefix to actually use, if any. Will return null
 *     if the use of host prefixes was disabled via setAllowHostPrefix().
 * @override
 */
WebChannelBase.prototype.correctHostPrefix = function(serverHostPrefix) {
  if (this.allowHostPrefix_) {
    if (this.handler_) {
      return this.handler_.correctHostPrefix(serverHostPrefix);
    }
    return serverHostPrefix;
  }
  return null;
};


/**
 * Handles the timer that indicates that our backchannel is no longer able to
 * successfully receive data from the server.
 * @private
 */
WebChannelBase.prototype.onBackChannelDead_ = function() {
  if (goog.isDefAndNotNull(this.deadBackChannelTimerId_)) {
    this.deadBackChannelTimerId_ = null;
    this.backChannelRequest_.cancel();
    this.backChannelRequest_ = null;
    this.maybeRetryBackChannel_();
    requestStats.notifyStatEvent(requestStats.Stat.BACKCHANNEL_DEAD);
  }
};


/**
 * Clears the timer that indicates that our backchannel is no longer able to
 * successfully receive data from the server.
 * @private
 */
WebChannelBase.prototype.clearDeadBackchannelTimer_ = function() {
  if (goog.isDefAndNotNull(this.deadBackChannelTimerId_)) {
    goog.global.clearTimeout(this.deadBackChannelTimerId_);
    this.deadBackChannelTimerId_ = null;
  }
};


/**
 * Returns whether or not the given error/status combination is fatal or not.
 * On fatal errors we immediately close the session rather than retrying the
 * failed request.
 * @param {?WebChannelRequest.Error} error The error code for the
 * failed request.
 * @param {number} statusCode The last HTTP status code.
 * @return {boolean} Whether or not the error is fatal.
 * @private
 */
WebChannelBase.isFatalError_ = function(error, statusCode) {
  return error == WebChannelRequest.Error.UNKNOWN_SESSION_ID ||
      error == WebChannelRequest.Error.ACTIVE_X_BLOCKED ||
      (error == WebChannelRequest.Error.STATUS &&
       statusCode > 0);
};


/**
 * @override
 */
WebChannelBase.prototype.onRequestComplete = function(request) {
  this.channelDebug_.debug('Request complete');
  var type;
  if (this.backChannelRequest_ == request) {
    this.clearDeadBackchannelTimer_();
    this.backChannelRequest_ = null;
    type = WebChannelBase.ChannelType_.BACK_CHANNEL;
  } else if (this.forwardChannelRequest_ == request) {
    this.forwardChannelRequest_ = null;
    type = WebChannelBase.ChannelType_.FORWARD_CHANNEL;
  } else {
    // return if it was an old request from a previous session
    return;
  }

  this.lastStatusCode_ = request.getLastStatusCode();

  if (this.state_ == WebChannelBase.State.CLOSED) {
    return;
  }

  if (request.getSuccess()) {
    // Yay!
    if (type == WebChannelBase.ChannelType_.FORWARD_CHANNEL) {
      var size = request.getPostData() ? request.getPostData().length : 0;
      requestStats.notifyTimingEvent(size,
          goog.now() - request.getRequestStartTime(),
          this.forwardChannelRetryCount_);
      this.ensureForwardChannel_();
      this.onSuccess_();
      this.pendingMaps_.length = 0;
    } else {  // i.e., back-channel
      this.ensureBackChannel_();
    }
    return;
  }
  // Else unsuccessful. Fall through.

  var lastError = request.getLastError();
  if (!WebChannelBase.isFatalError_(lastError, this.lastStatusCode_)) {
    // Maybe retry.
    this.channelDebug_.debug('Maybe retrying, last error: ' +
        WebChannelRequest.errorStringFromCode(
            /** @type {WebChannelRequest.Error} */ (lastError),
            this.lastStatusCode_));
    if (type == WebChannelBase.ChannelType_.FORWARD_CHANNEL) {
      if (this.maybeRetryForwardChannel_(request)) {
        return;
      }
    }
    if (type == WebChannelBase.ChannelType_.BACK_CHANNEL) {
      if (this.maybeRetryBackChannel_()) {
        return;
      }
    }
    // Else exceeded max retries. Fall through.
    this.channelDebug_.debug('Exceeded max number of retries');
  } else {
    // Else fatal error. Fall through and mark the pending maps as failed.
    this.channelDebug_.debug('Not retrying due to error type');
  }


  // Can't save this session. :(
  this.channelDebug_.debug('Error: HTTP request failed');
  switch (lastError) {
    case WebChannelRequest.Error.NO_DATA:
      this.signalError_(WebChannelBase.Error.NO_DATA);
      break;
    case WebChannelRequest.Error.BAD_DATA:
      this.signalError_(WebChannelBase.Error.BAD_DATA);
      break;
    case WebChannelRequest.Error.UNKNOWN_SESSION_ID:
      this.signalError_(WebChannelBase.Error.UNKNOWN_SESSION_ID);
      break;
    case WebChannelRequest.Error.ACTIVE_X_BLOCKED:
      this.signalError_(WebChannelBase.Error.ACTIVE_X_BLOCKED);
      break;
    default:
      this.signalError_(WebChannelBase.Error.REQUEST_FAILED);
      break;
  }
};


/**
 * @param {number} retryCount Number of retries so far.
 * @return {number} Time in ms before firing next retry request.
 * @private
 */
WebChannelBase.prototype.getRetryTime_ = function(retryCount) {
  var retryTime = this.baseRetryDelayMs_ +
      Math.floor(Math.random() * this.retryDelaySeedMs_);
  if (!this.isActive()) {
    this.channelDebug_.debug('Inactive channel');
    retryTime =
        retryTime * WebChannelBase.INACTIVE_CHANNEL_RETRY_FACTOR;
  }
  // Backoff for subsequent retries
  retryTime *= retryCount;
  return retryTime;
};


/**
 * @param {number} baseDelayMs The base part of the retry delay, in ms.
 * @param {number} delaySeedMs A random delay between 0 and this is added to
 *     the base part.
 */
WebChannelBase.prototype.setRetryDelay = function(baseDelayMs, delaySeedMs) {
  this.baseRetryDelayMs_ = baseDelayMs;
  this.retryDelaySeedMs_ = delaySeedMs;
};


/**
 * Processes the data returned by the server.
 * @param {!Array.<!Array>} respArray The response array returned by the server.
 * @private
 */
WebChannelBase.prototype.onInput_ = function(respArray) {
  var batch = this.handler_ && this.handler_.channelHandleMultipleArrays ?
      [] : null;
  for (var i = 0; i < respArray.length; i++) {
    var nextArray = respArray[i];
    this.lastArrayId_ = nextArray[0];
    nextArray = nextArray[1];
    if (this.state_ == WebChannelBase.State.OPENING) {
      if (nextArray[0] == 'c') {
        this.sid_ = nextArray[1];
        this.hostPrefix_ = this.correctHostPrefix(nextArray[2]);
        var negotiatedVersion = nextArray[3];
        if (goog.isDefAndNotNull(negotiatedVersion)) {
          this.channelVersion_ = negotiatedVersion;
        }
        this.state_ = WebChannelBase.State.OPENED;
        if (this.handler_) {
          this.handler_.channelOpened(this);
        }
        this.backChannelUri_ = this.getBackChannelUri(
            this.hostPrefix_, /** @type {string} */ (this.path_));
        // Open connection to receive data
        this.ensureBackChannel_();
      } else if (nextArray[0] == 'stop') {
        this.signalError_(WebChannelBase.Error.STOP);
      }
    } else if (this.state_ == WebChannelBase.State.OPENED) {
      if (nextArray[0] == 'stop') {
        if (batch && !goog.array.isEmpty(batch)) {
          this.handler_.channelHandleMultipleArrays(this, batch);
          batch.length = 0;
        }
        this.signalError_(WebChannelBase.Error.STOP);
      } else if (nextArray[0] == 'noop') {
        // ignore - noop to keep connection happy
      } else {
        if (batch) {
          batch.push(nextArray);
        } else if (this.handler_) {
          this.handler_.channelHandleArray(this, nextArray);
        }
      }
      // We have received useful data on the back-channel, so clear its retry
      // count. We do this because back-channels by design do not complete
      // quickly, so on a flaky connection we could have many fail to complete
      // fully but still deliver a lot of data before they fail. We don't want
      // to count such failures towards the retry limit, because we don't want
      // to give up on a session if we can still receive data.
      this.backChannelRetryCount_ = 0;
    }
  }
  if (batch && !goog.array.isEmpty(batch)) {
    this.handler_.channelHandleMultipleArrays(this, batch);
  }
};


/**
 * Helper to ensure the channel is in the expected state.
 * @param {...number} var_args The channel must be in one of the indicated
 *     states.
 * @private
 */
WebChannelBase.prototype.ensureInState_ = function(var_args) {
  goog.asserts.assert(goog.array.contains(arguments, this.state_),
      'Unexpected channel state: %s', this.state_);
};


/**
 * Signals an error has occurred.
 * @param {WebChannelBase.Error} error The error code for the failure.
 * @private
 */
WebChannelBase.prototype.signalError_ = function(error) {
  this.channelDebug_.info('Error code ' + error);
  if (error == WebChannelBase.Error.REQUEST_FAILED ||
      error == WebChannelBase.Error.BLOCKED) {
    // Ping google to check if it's a server error or user's network error.
    var imageUri = null;
    if (this.handler_) {
      imageUri = this.handler_.getNetworkTestImageUri(this);
    }
    goog.net.tmpnetwork.testGoogleCom(
        goog.bind(this.testGoogleComCallback_, this), imageUri);
  } else {
    requestStats.notifyStatEvent(requestStats.Stat.ERROR_OTHER);
  }
  this.onError_(error);
};


/**
 * Callback for testGoogleCom during error handling.
 * @param {boolean} networkUp Whether the network is up.
 * @private
 */
WebChannelBase.prototype.testGoogleComCallback_ = function(networkUp) {
  if (networkUp) {
    this.channelDebug_.info('Successfully pinged google.com');
    requestStats.notifyStatEvent(requestStats.Stat.ERROR_OTHER);
  } else {
    this.channelDebug_.info('Failed to ping google.com');
    requestStats.notifyStatEvent(requestStats.Stat.ERROR_NETWORK);
    // We call onError_ here instead of signalError_ because the latter just
    // calls notifyStatEvent, and we don't want to have another stat event.
    this.onError_(WebChannelBase.Error.NETWORK);
  }
};


/**
 * Called when messages have been successfully sent from the queue.
 * @private
 */
WebChannelBase.prototype.onSuccess_ = function() {
  if (this.handler_) {
    this.handler_.channelSuccess(this, this.pendingMaps_);
  }
};


/**
 * Called when we've determined the final error for a channel. It closes the
 * notifiers the handler of the error and closes the channel.
 * @param {WebChannelBase.Error} error  The error code for the failure.
 * @private
 */
WebChannelBase.prototype.onError_ = function(error) {
  this.channelDebug_.debug('HttpChannel: error - ' + error);
  this.state_ = WebChannelBase.State.CLOSED;
  if (this.handler_) {
    this.handler_.channelError(this, error);
  }
  this.onClose_();
  this.cancelRequests_();
};


/**
 * Called when the channel has been closed. It notifiers the handler of the
 * event, and reports any pending or undelivered maps.
 * @private
 */
WebChannelBase.prototype.onClose_ = function() {
  this.state_ = WebChannelBase.State.CLOSED;
  this.lastStatusCode_ = -1;
  if (this.handler_) {
    if (this.pendingMaps_.length == 0 && this.outgoingMaps_.length == 0) {
      this.handler_.channelClosed(this);
    } else {
      this.channelDebug_.debug('Number of undelivered maps' +
          ', pending: ' + this.pendingMaps_.length +
          ', outgoing: ' + this.outgoingMaps_.length);

      var copyOfPendingMaps = goog.array.clone(this.pendingMaps_);
      var copyOfUndeliveredMaps = goog.array.clone(this.outgoingMaps_);
      this.pendingMaps_.length = 0;
      this.outgoingMaps_.length = 0;

      this.handler_.channelClosed(this, copyOfPendingMaps,
          copyOfUndeliveredMaps);
    }
  }
};


/**
 * @override
 */
WebChannelBase.prototype.getForwardChannelUri = function(path) {
  var uri = this.createDataUri(null, path);
  this.channelDebug_.debug('GetForwardChannelUri: ' + uri);
  return uri;
};


/**
 * @override
 */
WebChannelBase.prototype.getFirstTestResults = function() {
  return this.firstTestResults_;
};


/**
 * Gets the results for the second channel test
 * @return {?boolean} The results. True -> buffered connection,
 *      False -> unbuffered, null -> unknown.
 */
WebChannelBase.prototype.getSecondTestResults = function() {
  return this.secondTestResults_;
};


/**
 * @override
 */
WebChannelBase.prototype.getBackChannelUri = function(hostPrefix, path) {
  var uri = this.createDataUri(this.shouldUseSecondaryDomains() ?
      hostPrefix : null, path);
  this.channelDebug_.debug('GetBackChannelUri: ' + uri);
  return uri;
};


/**
 * @override
 */
WebChannelBase.prototype.createDataUri =
    function(hostPrefix, path, opt_overridePort) {
  var uri = goog.Uri.parse(path);
  var uriAbsolute = (uri.getDomain() != '');
  if (uriAbsolute) {
    if (hostPrefix) {
      uri.setDomain(hostPrefix + '.' + uri.getDomain());
    }

    uri.setPort(opt_overridePort || uri.getPort());
  } else {
    var locationPage = window.location;
    var hostName;
    if (hostPrefix) {
      hostName = hostPrefix + '.' + locationPage.hostname;
    } else {
      hostName = locationPage.hostname;
    }

    var port = opt_overridePort || locationPage.port;

    uri = goog.Uri.create(locationPage.protocol, null, hostName, port, path);
  }

  if (this.extraParams_) {
    goog.structs.forEach(this.extraParams_, function(value, key, coll) {
      uri.setParameterValue(key, value);
    });
  }

  // Add the protocol version to the URI.
  uri.setParameterValue('VER', this.channelVersion_);

  // Add the reconnect parameters.
  this.addAdditionalParams_(uri);

  return uri;
};


/**
 * @override
 */
WebChannelBase.prototype.createXhrIo = function(hostPrefix) {
  if (hostPrefix && !this.supportsCrossDomainXhrs_) {
    throw Error('Can\'t create secondary domain capable XhrIo object.');
  }
  var xhr = new goog.net.XhrIo();
  xhr.setWithCredentials(this.supportsCrossDomainXhrs_);
  return xhr;
};


/**
 * @override
 */
WebChannelBase.prototype.isActive = function() {
  return !!this.handler_ && this.handler_.isActive(this);
};


/**
 * @override
 */
WebChannelBase.prototype.shouldUseSecondaryDomains = function() {
  return this.supportsCrossDomainXhrs_ ||
      !WebChannelRequest.supportsXhrStreaming();
};


/**
 * A LogSaver that can be used to accumulate all the debug logs so they
 * can be sent to the server when a problem is detected.
 */
WebChannelBase.LogSaver = {};


/**
 * Buffer for accumulating the debug log
 * @type {goog.structs.CircularBuffer}
 * @private
 */
WebChannelBase.LogSaver.buffer_ = new goog.structs.CircularBuffer(1000);


/**
 * Whether we're currently accumulating the debug log.
 * @type {boolean}
 * @private
 */
WebChannelBase.LogSaver.enabled_ = false;


/**
 * Formatter for saving logs.
 * @type {goog.debug.Formatter}
 * @private
 */
WebChannelBase.LogSaver.formatter_ = new goog.debug.TextFormatter();


/**
 * Returns whether the LogSaver is enabled.
 * @return {boolean} Whether saving is enabled or disabled.
 */
WebChannelBase.LogSaver.isEnabled = function() {
  return WebChannelBase.LogSaver.enabled_;
};


/**
 * Enables of disables the LogSaver.
 * @param {boolean} enable Whether to enable or disable saving.
 */
WebChannelBase.LogSaver.setEnabled = function(enable) {
  if (enable == WebChannelBase.LogSaver.enabled_) {
    return;
  }

  var fn = WebChannelBase.LogSaver.addLogRecord;
  var logger = goog.log.getLogger('goog.net');
  if (enable) {
    goog.log.addHandler(logger, fn);
  } else {
    goog.log.removeHandler(logger, fn);
  }
};


/**
 * Adds a log record.
 * @param {goog.log.LogRecord} logRecord the LogRecord.
 */
WebChannelBase.LogSaver.addLogRecord = function(logRecord) {
  WebChannelBase.LogSaver.buffer_.add(
      WebChannelBase.LogSaver.formatter_.formatRecord(logRecord));
};


/**
 * Returns the log as a single string.
 * @return {string} The log as a single string.
 */
WebChannelBase.LogSaver.getBuffer = function() {
  return WebChannelBase.LogSaver.buffer_.getValues().join('');
};


/**
 * Clears the buffer
 */
WebChannelBase.LogSaver.clearBuffer = function() {
  WebChannelBase.LogSaver.buffer_.clear();
};



/**
 * Abstract base class for the channel handler
 * @constructor
 */
WebChannelBase.Handler = function() {};


/**
 * Callback handler for when a batch of response arrays is received from the
 * server.
 * @type {?function(!WebChannelBase, !Array.<!Array>)}
 */
WebChannelBase.Handler.prototype.channelHandleMultipleArrays =
    goog.abstractMethod;


/**
 * Whether it's okay to make a request to the server. A handler can return
 * false if the channel should fail. For example, if the user has logged out,
 * the handler may want all requests to fail immediately.
 * @param {WebChannelBase} channel The channel.
 * @return {WebChannelBase.Error} An error code. The code should
 * return WebChannelBase.Error.OK to indicate it's okay. Any other
 * error code will cause a failure.
 */
WebChannelBase.Handler.prototype.okToMakeRequest = function(channel) {
  return WebChannelBase.Error.OK;
};


/**
 * Indicates the WebChannel has successfully negotiated with the server
 * and can now send and receive data.
 * @param {WebChannelBase} channel The channel.
 */
WebChannelBase.Handler.prototype.channelOpened = function(channel) {
};


/**
 * New input is available for the application to process.
 *
 * @param {WebChannelBase} channel The channel.
 * @param {Array} array The data array.
 */
WebChannelBase.Handler.prototype.channelHandleArray = function(channel, array) {
};


/**
 * Indicates maps were successfully sent on the channel.
 *
 * @param {WebChannelBase} channel The channel.
 * @param {Array.<WebChannelBase.QueuedMap>} deliveredMaps The
 *     array of maps that have been delivered to the server. This is a direct
 *     reference to the internal array, so a copy should be made
 *     if the caller desires a reference to the data.
 */
WebChannelBase.Handler.prototype.channelSuccess =
    function(channel, deliveredMaps) {
};


/**
 * Indicates an error occurred on the WebChannel.
 *
 * @param {WebChannelBase} channel The channel.
 * @param {WebChannelBase.Error} error The error code.
 */
WebChannelBase.Handler.prototype.channelError = function(channel, error) {
};


/**
 * Indicates the WebChannel is closed. Also notifies about which maps,
 * if any, that may not have been delivered to the server.
 * @param {WebChannelBase} channel The channel.
 * @param {Array.<WebChannelBase.QueuedMap>=} opt_pendingMaps The
 *     array of pending maps, which may or may not have been delivered to the
 *     server.
 * @param {Array.<WebChannelBase.QueuedMap>=} opt_undeliveredMaps
 *     The array of undelivered maps, which have definitely not been delivered
 *     to the server.
 */
WebChannelBase.Handler.prototype.channelClosed =
    function(channel, opt_pendingMaps, opt_undeliveredMaps) {
};


/**
 * Gets any parameters that should be added at the time another connection is
 * made to the server.
 * @param {WebChannelBase} channel The channel.
 * @return {Object} Extra parameter keys and values to add to the
 *                  requests.
 */
WebChannelBase.Handler.prototype.getAdditionalParams = function(channel) {
  return {};
};


/**
 * Gets the URI of an image that can be used to test network connectivity.
 * @param {WebChannelBase} channel The channel.
 * @return {goog.Uri?} A custom URI to load for the network test.
 */
WebChannelBase.Handler.prototype.getNetworkTestImageUri = function(channel) {
  return null;
};


/**
 * Gets whether this channel is currently active. This is used to determine the
 * length of time to wait before retrying.
 * @param {WebChannelBase} channel The channel.
 * @return {boolean} Whether the channel is currently active.
 */
WebChannelBase.Handler.prototype.isActive = function(channel) {
  return true;
};


/**
 * Called by the channel if enumeration of the map throws an exception.
 * @param {WebChannelBase} channel The channel.
 * @param {Object} map The map that can't be enumerated.
 */
WebChannelBase.Handler.prototype.badMapError = function(channel, map) {
  return;
};


/**
 * Allows the handler to override a host prefix provided by the server. Will
 * be called whenever the channel has received such a prefix and is considering
 * its use.
 * @param {?string} serverHostPrefix The host prefix provided by the server.
 * @return {?string} The host prefix the client should use.
 */
WebChannelBase.Handler.prototype.correctHostPrefix =
    function(serverHostPrefix) {
  return serverHostPrefix;
};
});  // goog.scope
