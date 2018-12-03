package corgis.tate.domain;

import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import corgis.tate.domain.Artist;
import corgis.tate.domain.Data;
import corgis.tate.domain.Dimensions;
import corgis.tate.domain.Metadata;

/**
 * 
 */
public class Artwork {
	
    private Artist artist;
    private Data data;
    private Dimensions dimensions;
    private Metadata metadata;
    
    
    /**
     * 
     * @return Artist
     */
    public Artist getArtist() {
        return this.artist;
    }
    
    
    
    /**
     * 
     * @return Data
     */
    public Data getData() {
        return this.data;
    }
    
    
    
    /**
     * 
     * @return Dimensions
     */
    public Dimensions getDimensions() {
        return this.dimensions;
    }
    
    
    
    /**
     * 
     * @return Metadata
     */
    public Metadata getMetadata() {
        return this.metadata;
    }
    
    
    
	
	/**
	 * Creates a string based representation of this Artwork.
	
	 * @return String
	 */
	public String toString() {
		return "Artwork[" +artist+", "+data+", "+dimensions+", "+metadata+"]";
	}
	
	/**
	 * Internal constructor to create a Artwork from a  representation.
	 * @param json_data The raw json data that will be parsed.
	 */
    public Artwork(JSONObject json_data) {
        //System.out.println(json_data);
        
        try {
            // artist
            this.artist = new Artist((JSONObject)json_data.get("artist"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Artwork; the field artist was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Artwork; the field artist had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // data
            this.data = new Data((JSONObject)json_data.get("data"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Artwork; the field data was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Artwork; the field data had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // dimensions
            this.dimensions = new Dimensions((JSONObject)json_data.get("dimensions"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Artwork; the field dimensions was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Artwork; the field dimensions had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // metadata
            this.metadata = new Metadata((JSONObject)json_data.get("metadata"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Artwork; the field metadata was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Artwork; the field metadata had the wrong structure.");
    		e.printStackTrace();
        }
        
	}	
}