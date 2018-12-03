package corgis.skyscrapers.domain;

import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import corgis.skyscrapers.domain.Started;
import corgis.skyscrapers.domain.Completed;

/**
 * 
 */
public class Status {
	
    private String current;
    private Started started;
    private Completed completed;
    
    
    /**
     * 
     * @return String
     */
    public String getCurrent() {
        return this.current;
    }
    
    
    
    /**
     * 
     * @return Started
     */
    public Started getStarted() {
        return this.started;
    }
    
    
    
    /**
     * 
     * @return Completed
     */
    public Completed getCompleted() {
        return this.completed;
    }
    
    
    
	
	/**
	 * Creates a string based representation of this Status.
	
	 * @return String
	 */
	public String toString() {
		return "Status[" +current+", "+started+", "+completed+"]";
	}
	
	/**
	 * Internal constructor to create a Status from a  representation.
	 * @param json_data The raw json data that will be parsed.
	 */
    public Status(JSONObject json_data) {
        //System.out.println(json_data);
        
        try {
            // current
            this.current = (String)json_data.get("current");
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Status; the field current was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Status; the field current had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // started
            this.started = new Started((JSONObject)json_data.get("started"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Status; the field started was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Status; the field started had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // completed
            this.completed = new Completed((JSONObject)json_data.get("completed"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Status; the field completed was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Status; the field completed had the wrong structure.");
    		e.printStackTrace();
        }
        
	}	
}