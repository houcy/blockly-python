package corgis.aids.domain;

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
public class AidsRelatedDeaths {
	
    // All adults (older than 15 years of age) who have died of aids.
    private Integer adults;
    // The total number of deaths caused by AIDS in this year.
    private Integer allAges;
    // Children who have been orphaned from AIDS (parents died of AIDS) below 17 years of age.
    private Integer aidsOrphans;
    // Children who have died of AIDS below 14 years of age.
    private Integer children;
    // Female adults (older than 15 years of age) who have died of aids.
    private Integer femaleAdults;
    // Male adults (older than 15 years of age) who have died of aids.
    private Integer maleAdults;
    
    
    /**
     * All adults (older than 15 years of age) who have died of aids.
     * @return Integer
     */
    public Integer getAdults() {
        return this.adults;
    }
    
    
    
    /**
     * The total number of deaths caused by AIDS in this year.
     * @return Integer
     */
    public Integer getAllAges() {
        return this.allAges;
    }
    
    
    
    /**
     * Children who have been orphaned from AIDS (parents died of AIDS) below 17 years of age.
     * @return Integer
     */
    public Integer getAidsOrphans() {
        return this.aidsOrphans;
    }
    
    
    
    /**
     * Children who have died of AIDS below 14 years of age.
     * @return Integer
     */
    public Integer getChildren() {
        return this.children;
    }
    
    
    
    /**
     * Female adults (older than 15 years of age) who have died of aids.
     * @return Integer
     */
    public Integer getFemaleAdults() {
        return this.femaleAdults;
    }
    
    
    
    /**
     * Male adults (older than 15 years of age) who have died of aids.
     * @return Integer
     */
    public Integer getMaleAdults() {
        return this.maleAdults;
    }
    
    
    
	
	/**
	 * Creates a string based representation of this Aids-RelatedDeaths.
	
	 * @return String
	 */
	public String toString() {
		return "Aids-RelatedDeaths[" +adults+", "+allAges+", "+aidsOrphans+", "+children+", "+femaleAdults+", "+maleAdults+"]";
	}
	
	/**
	 * Internal constructor to create a Aids-RelatedDeaths from a  representation.
	 * @param json_data The raw json data that will be parsed.
	 */
    public AidsRelatedDeaths(JSONObject json_data) {
        //System.out.println(json_data);
        
        try {
            // Adults
            this.adults = ((Number)json_data.get("Adults")).intValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Aids-RelatedDeaths; the field adults was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Aids-RelatedDeaths; the field adults had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // All Ages
            this.allAges = ((Number)json_data.get("All Ages")).intValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Aids-RelatedDeaths; the field allAges was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Aids-RelatedDeaths; the field allAges had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // AIDS Orphans
            this.aidsOrphans = ((Number)json_data.get("AIDS Orphans")).intValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Aids-RelatedDeaths; the field aidsOrphans was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Aids-RelatedDeaths; the field aidsOrphans had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Children
            this.children = ((Number)json_data.get("Children")).intValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Aids-RelatedDeaths; the field children was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Aids-RelatedDeaths; the field children had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Female Adults
            this.femaleAdults = ((Number)json_data.get("Female Adults")).intValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Aids-RelatedDeaths; the field femaleAdults was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Aids-RelatedDeaths; the field femaleAdults had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Male Adults
            this.maleAdults = ((Number)json_data.get("Male Adults")).intValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Aids-RelatedDeaths; the field maleAdults was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Aids-RelatedDeaths; the field maleAdults had the wrong structure.");
    		e.printStackTrace();
        }
        
	}	
}