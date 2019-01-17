package corgis.school_scores.domain;

import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import corgis.school_scores.domain.Math;
import corgis.school_scores.domain.Verbal;

/**
 * 
 */
public class BetweenSixzerozeroToSevenzerozero {
	
    private Math math;
    private Verbal verbal;
    
    
    /**
     * 
     * @return Math
     */
    public Math getMath() {
        return this.math;
    }
    
    
    
    /**
     * 
     * @return Verbal
     */
    public Verbal getVerbal() {
        return this.verbal;
    }
    
    
    
	
	/**
	 * Creates a string based representation of this Between600To700.
	
	 * @return String
	 */
	public String toString() {
		return "Between600To700[" +math+", "+verbal+"]";
	}
	
	/**
	 * Internal constructor to create a Between600To700 from a  representation.
	 * @param json_data The raw json data that will be parsed.
	 */
    public BetweenSixzerozeroToSevenzerozero(JSONObject json_data) {
        //System.out.println(json_data);
        
        try {
            // Math
            this.math = new Math((JSONObject)json_data.get("Math"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Between600To700; the field math was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Between600To700; the field math had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Verbal
            this.verbal = new Verbal((JSONObject)json_data.get("Verbal"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Between600To700; the field verbal was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Between600To700; the field verbal had the wrong structure.");
    		e.printStackTrace();
        }
        
	}	
}