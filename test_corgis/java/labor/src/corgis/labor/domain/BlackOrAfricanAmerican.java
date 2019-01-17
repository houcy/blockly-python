package corgis.labor.domain;

import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import corgis.labor.domain.Counts;
import corgis.labor.domain.UnemploymentRate;

/**
 * 
 */
public class BlackOrAfricanAmerican {
	
    private Counts counts;
    private UnemploymentRate unemploymentRate;
    
    
    /**
     * 
     * @return Counts
     */
    public Counts getCounts() {
        return this.counts;
    }
    
    
    
    /**
     * 
     * @return UnemploymentRate
     */
    public UnemploymentRate getUnemploymentRate() {
        return this.unemploymentRate;
    }
    
    
    
	
	/**
	 * Creates a string based representation of this BlackOrAfricanAmerican.
	
	 * @return String
	 */
	public String toString() {
		return "BlackOrAfricanAmerican[" +counts+", "+unemploymentRate+"]";
	}
	
	/**
	 * Internal constructor to create a BlackOrAfricanAmerican from a  representation.
	 * @param json_data The raw json data that will be parsed.
	 */
    public BlackOrAfricanAmerican(JSONObject json_data) {
        //System.out.println(json_data);
        
        try {
            // Counts
            this.counts = new Counts((JSONObject)json_data.get("Counts"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a BlackOrAfricanAmerican; the field counts was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a BlackOrAfricanAmerican; the field counts had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Unemployment Rate
            this.unemploymentRate = new UnemploymentRate((JSONObject)json_data.get("Unemployment Rate"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a BlackOrAfricanAmerican; the field unemploymentRate was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a BlackOrAfricanAmerican; the field unemploymentRate had the wrong structure.");
    		e.printStackTrace();
        }
        
	}	
}