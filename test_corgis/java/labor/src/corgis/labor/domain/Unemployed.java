package corgis.labor.domain;

import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import corgis.labor.domain.White;
import corgis.labor.domain.BlackOrAfricanAmerican;
import corgis.labor.domain.Asian;

/**
 * 
 */
public class Unemployed {
	
    private White white;
    private BlackOrAfricanAmerican blackOrAfricanAmerican;
    private Asian asian;
    
    
    /**
     * 
     * @return White
     */
    public White getWhite() {
        return this.white;
    }
    
    
    
    /**
     * 
     * @return BlackOrAfricanAmerican
     */
    public BlackOrAfricanAmerican getBlackOrAfricanAmerican() {
        return this.blackOrAfricanAmerican;
    }
    
    
    
    /**
     * 
     * @return Asian
     */
    public Asian getAsian() {
        return this.asian;
    }
    
    
    
	
	/**
	 * Creates a string based representation of this Unemployed.
	
	 * @return String
	 */
	public String toString() {
		return "Unemployed[" +white+", "+blackOrAfricanAmerican+", "+asian+"]";
	}
	
	/**
	 * Internal constructor to create a Unemployed from a  representation.
	 * @param json_data The raw json data that will be parsed.
	 */
    public Unemployed(JSONObject json_data) {
        //System.out.println(json_data);
        
        try {
            // White
            this.white = new White((JSONObject)json_data.get("White"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Unemployed; the field white was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Unemployed; the field white had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Black or African American
            this.blackOrAfricanAmerican = new BlackOrAfricanAmerican((JSONObject)json_data.get("Black or African American"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Unemployed; the field blackOrAfricanAmerican was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Unemployed; the field blackOrAfricanAmerican had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Asian
            this.asian = new Asian((JSONObject)json_data.get("Asian"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Unemployed; the field asian was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Unemployed; the field asian had the wrong structure.");
    		e.printStackTrace();
        }
        
	}	
}