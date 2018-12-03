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
public class Female {
	
    // The number of test-takers in this state during this year who identified as Female.
    private Integer testTakers;
    // The average Math score of students in this state during this year who identified as Female.
    private Integer math;
    // The average Verbal (Reading, not Writing) score of students in this state during this year who identified as Female.
    private Integer verbal;
    
    
    /**
     * The number of test-takers in this state during this year who identified as Female.
     * @return Integer
     */
    public Integer getTestTakers() {
        return this.testTakers;
    }
    
    
    
    /**
     * The average Math score of students in this state during this year who identified as Female.
     * @return Integer
     */
    public Integer getMath() {
        return this.math;
    }
    
    
    
    /**
     * The average Verbal (Reading, not Writing) score of students in this state during this year who identified as Female.
     * @return Integer
     */
    public Integer getVerbal() {
        return this.verbal;
    }
    
    
    
	
	/**
	 * Creates a string based representation of this Female.
	
	 * @return String
	 */
	public String toString() {
		return "Female[" +testTakers+", "+math+", "+verbal+"]";
	}
	
	/**
	 * Internal constructor to create a Female from a  representation.
	 * @param json_data The raw json data that will be parsed.
	 */
    public Female(JSONObject json_data) {
        //System.out.println(json_data);
        
        try {
            // Test-takers
            this.testTakers = ((Number)json_data.get("Test-takers")).intValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Female; the field testTakers was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Female; the field testTakers had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Math
            this.math = ((Number)json_data.get("Math")).intValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Female; the field math was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Female; the field math had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Verbal
            this.verbal = ((Number)json_data.get("Verbal")).intValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Female; the field verbal was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Female; the field verbal had the wrong structure.");
    		e.printStackTrace();
        }
        
	}	
}