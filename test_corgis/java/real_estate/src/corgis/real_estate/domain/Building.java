package corgis.real_estate.domain;

import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import corgis.real_estate.domain.Data;
import corgis.real_estate.domain.Location;

/**
 * 
 */
public class Building {
	
    private Data data;
    private Location location;
    
    
    /**
     * 
     * @return Data
     */
    public Data getData() {
        return this.data;
    }
    
    
    
    /**
     * 
     * @return Location
     */
    public Location getLocation() {
        return this.location;
    }
    
    
    
	
	/**
	 * Creates a string based representation of this Building.
	
	 * @return String
	 */
	public String toString() {
		return "Building[" +data+", "+location+"]";
	}
	
	/**
	 * Internal constructor to create a Building from a  representation.
	 * @param json_data The raw json data that will be parsed.
	 */
    public Building(JSONObject json_data) {
        //System.out.println(json_data);
        
        try {
            // data
            this.data = new Data((JSONObject)json_data.get("data"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Building; the field data was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Building; the field data had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // location
            this.location = new Location((JSONObject)json_data.get("location"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Building; the field location was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Building; the field location had the wrong structure.");
    		e.printStackTrace();
        }
        
	}	
}