package corgis.labor.domain;

import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import corgis.labor.domain.ParticipationRate;
import corgis.labor.domain.Counts;

/**
 * 
 */
public class White {
	
    private ParticipationRate participationRate;
    private Counts counts;
    
    
    /**
     * 
     * @return ParticipationRate
     */
    public ParticipationRate getParticipationRate() {
        return this.participationRate;
    }
    
    
    
    /**
     * 
     * @return Counts
     */
    public Counts getCounts() {
        return this.counts;
    }
    
    
    
	
	/**
	 * Creates a string based representation of this White.
	
	 * @return String
	 */
	public String toString() {
		return "White[" +participationRate+", "+counts+"]";
	}
	
	/**
	 * Internal constructor to create a White from a  representation.
	 * @param json_data The raw json data that will be parsed.
	 */
    public White(JSONObject json_data) {
        //System.out.println(json_data);
        
        try {
            // Participation Rate
            this.participationRate = new ParticipationRate((JSONObject)json_data.get("Participation Rate"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a White; the field participationRate was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a White; the field participationRate had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Counts
            this.counts = new Counts((JSONObject)json_data.get("Counts"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a White; the field counts was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a White; the field counts had the wrong structure.");
    		e.printStackTrace();
        }
        
	}	
}