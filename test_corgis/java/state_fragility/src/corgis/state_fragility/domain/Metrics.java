package corgis.state_fragility.domain;

import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import corgis.state_fragility.domain.Legitimacy;
import corgis.state_fragility.domain.Effectiveness;

/**
 * 
 */
public class Metrics {
	
    private Legitimacy legitimacy;
    private Effectiveness effectiveness;
    // The sum of the Effectiveness Score and the Legitimacy Score
    private Integer stateFragilityIndex;
    
    
    /**
     * 
     * @return Legitimacy
     */
    public Legitimacy getLegitimacy() {
        return this.legitimacy;
    }
    
    
    
    /**
     * 
     * @return Effectiveness
     */
    public Effectiveness getEffectiveness() {
        return this.effectiveness;
    }
    
    
    
    /**
     * The sum of the Effectiveness Score and the Legitimacy Score
     * @return Integer
     */
    public Integer getStateFragilityIndex() {
        return this.stateFragilityIndex;
    }
    
    
    
	
	/**
	 * Creates a string based representation of this Metrics.
	
	 * @return String
	 */
	public String toString() {
		return "Metrics[" +legitimacy+", "+effectiveness+", "+stateFragilityIndex+"]";
	}
	
	/**
	 * Internal constructor to create a Metrics from a  representation.
	 * @param json_data The raw json data that will be parsed.
	 */
    public Metrics(JSONObject json_data) {
        //System.out.println(json_data);
        
        try {
            // Legitimacy
            this.legitimacy = new Legitimacy((JSONObject)json_data.get("Legitimacy"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Metrics; the field legitimacy was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Metrics; the field legitimacy had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Effectiveness
            this.effectiveness = new Effectiveness((JSONObject)json_data.get("Effectiveness"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Metrics; the field effectiveness was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Metrics; the field effectiveness had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // State Fragility Index
            this.stateFragilityIndex = ((Number)json_data.get("State Fragility Index")).intValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Metrics; the field stateFragilityIndex was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Metrics; the field stateFragilityIndex had the wrong structure.");
    		e.printStackTrace();
        }
        
	}	
}