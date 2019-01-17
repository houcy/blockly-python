package corgis.music.domain;

import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import corgis.music.domain.Release;
import corgis.music.domain.Artist;
import corgis.music.domain.Song;

/**
 * 
 */
public class Music {
	
    private Release release;
    private Artist artist;
    private Song song;
    
    
    /**
     * 
     * @return Release
     */
    public Release getRelease() {
        return this.release;
    }
    
    
    
    /**
     * 
     * @return Artist
     */
    public Artist getArtist() {
        return this.artist;
    }
    
    
    
    /**
     * 
     * @return Song
     */
    public Song getSong() {
        return this.song;
    }
    
    
    
	
	/**
	 * Creates a string based representation of this Music.
	
	 * @return String
	 */
	public String toString() {
		return "Music[" +release+", "+artist+", "+song+"]";
	}
	
	/**
	 * Internal constructor to create a Music from a  representation.
	 * @param json_data The raw json data that will be parsed.
	 */
    public Music(JSONObject json_data) {
        //System.out.println(json_data);
        
        try {
            // release
            this.release = new Release((JSONObject)json_data.get("release"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Music; the field release was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Music; the field release had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // artist
            this.artist = new Artist((JSONObject)json_data.get("artist"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Music; the field artist was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Music; the field artist had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // song
            this.song = new Song((JSONObject)json_data.get("song"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Music; the field song was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Music; the field song had the wrong structure.");
    		e.printStackTrace();
        }
        
	}	
}