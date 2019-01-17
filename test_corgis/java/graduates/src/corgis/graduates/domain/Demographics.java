package corgis.graduates.domain;

import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import corgis.graduates.domain.Gender;
import corgis.graduates.domain.Ethnicity;

/**
 * 
 */
public class Demographics {
	
    private Gender gender;
    // The estimated number of people awarded degrees in this major during this year.
    private Integer total;
    private Ethnicity ethnicity;
    
    
    /**
     * 
     * @return Gender
     */
    public Gender getGender() {
        return this.gender;
    }
    
    
    
    /**
     * The estimated number of people awarded degrees in this major during this year.
     * @return Integer
     */
    public Integer getTotal() {
        return this.total;
    }
    
    
    
    /**
     * 
     * @return Ethnicity
     */
    public Ethnicity getEthnicity() {
        return this.ethnicity;
    }
    
    
    
	
	/**
	 * Creates a string based representation of this Demographics.
	
	 * @return String
	 */
	public String toString() {
		return "Demographics[" +gender+", "+total+", "+ethnicity+"]";
	}
	
	/**
	 * Internal constructor to create a Demographics from a  representation.
	 * @param json_data The raw json data that will be parsed.
	 */
    public Demographics(JSONObject json_data) {
        //System.out.println(json_data);
        
        try {
            // Gender
            this.gender = new Gender((JSONObject)json_data.get("Gender"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Demographics; the field gender was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Demographics; the field gender had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Total
            this.total = ((Number)json_data.get("Total")).intValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Demographics; the field total was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Demographics; the field total had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Ethnicity
            this.ethnicity = new Ethnicity((JSONObject)json_data.get("Ethnicity"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Demographics; the field ethnicity was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Demographics; the field ethnicity had the wrong structure.");
    		e.printStackTrace();
        }
        
	}	
}