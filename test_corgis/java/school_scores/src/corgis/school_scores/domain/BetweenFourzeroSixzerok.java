package corgis.school_scores.domain;

import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;


/**
 * 
 */
public class BetweenFourzeroSixzerok {
	
    // The average Verbal (Reading, not Writing) score of students in this state during this year who reported that their family income was in this bracket.
    private Integer verbal;
    // The average Math score of students in this state during this year who reported that their family income was in this bracket.
    private Integer math;
    // The number of test-takers in this state during this year who reported that their family income was in this bracket.
    private Integer testTakers;
    
    
    /**
     * The average Verbal (Reading, not Writing) score of students in this state during this year who reported that their family income was in this bracket.
     * @return Integer
     */
    public Integer getVerbal() {
        return this.verbal;
    }
    
    
    
    /**
     * The average Math score of students in this state during this year who reported that their family income was in this bracket.
     * @return Integer
     */
    public Integer getMath() {
        return this.math;
    }
    
    
    
    /**
     * The number of test-takers in this state during this year who reported that their family income was in this bracket.
     * @return Integer
     */
    public Integer getTestTakers() {
        return this.testTakers;
    }
    
    
    
	
	/**
	 * Creates a string based representation of this Between40-60K.
	
	 * @return String
	 */
	public String toString() {
		return "Between40-60K[" +verbal+", "+math+", "+testTakers+"]";
	}
	
	/**
	 * Internal constructor to create a Between40-60K from a  representation.
	 * @param json_data The raw json data that will be parsed.
	 */
    public BetweenFourzeroSixzerok(JSONObject json_data) {
        //System.out.println(json_data);
        
        try {
            // Verbal
            this.verbal = ((Number)json_data.get("Verbal")).intValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Between40-60K; the field verbal was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Between40-60K; the field verbal had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Math
            this.math = ((Number)json_data.get("Math")).intValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Between40-60K; the field math was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Between40-60K; the field math had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Test-takers
            this.testTakers = ((Number)json_data.get("Test-takers")).intValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Between40-60K; the field testTakers was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Between40-60K; the field testTakers had the wrong structure.");
    		e.printStackTrace();
        }
        
	}	
}