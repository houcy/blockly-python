package corgis.airlines.domain;

import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import corgis.airlines.domain.Airport;
import corgis.airlines.domain.Statistics;
import corgis.airlines.domain.Time;

/**
 * 
 */
public class Airports {
	
    private Airport airport;
    private Statistics statistics;
    private Time time;
    
    
    /**
     * 
     * @return Airport
     */
    public Airport getAirport() {
        return this.airport;
    }
    
    
    
    /**
     * 
     * @return Statistics
     */
    public Statistics getStatistics() {
        return this.statistics;
    }
    
    
    
    /**
     * 
     * @return Time
     */
    public Time getTime() {
        return this.time;
    }
    
    
    
	
	/**
	 * Creates a string based representation of this Airports.
	
	 * @return String
	 */
	public String toString() {
		return "Airports[" +airport+", "+statistics+", "+time+"]";
	}
	
	/**
	 * Internal constructor to create a Airports from a  representation.
	 * @param json_data The raw json data that will be parsed.
	 */
    public Airports(JSONObject json_data) {
        //System.out.println(json_data);
        
        try {
            // Airport
            this.airport = new Airport((JSONObject)json_data.get("Airport"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Airports; the field airport was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Airports; the field airport had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Statistics
            this.statistics = new Statistics((JSONObject)json_data.get("Statistics"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Airports; the field statistics was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Airports; the field statistics had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Time
            this.time = new Time((JSONObject)json_data.get("Time"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Airports; the field time was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Airports; the field time had the wrong structure.");
    		e.printStackTrace();
        }
        
	}	
}