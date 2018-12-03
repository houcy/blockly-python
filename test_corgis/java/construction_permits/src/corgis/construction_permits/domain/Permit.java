package corgis.construction_permits.domain;

import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import corgis.construction_permits.domain.NumberOfPermits;
import corgis.construction_permits.domain.Period;
import corgis.construction_permits.domain.Valuations;

/**
 * 
 */
public class Permit {
	
    private NumberOfPermits numberOfPermits;
    private Period period;
    // In 1000's of units
    private Valuations valuations;
    private String name;
    
    
    /**
     * 
     * @return NumberOfPermits
     */
    public NumberOfPermits getNumberOfPermits() {
        return this.numberOfPermits;
    }
    
    
    
    /**
     * 
     * @return Period
     */
    public Period getPeriod() {
        return this.period;
    }
    
    
    
    /**
     * In 1000's of units
     * @return Valuations
     */
    public Valuations getValuations() {
        return this.valuations;
    }
    
    
    
    /**
     * 
     * @return String
     */
    public String getName() {
        return this.name;
    }
    
    
    
	
	/**
	 * Creates a string based representation of this Permit.
	
	 * @return String
	 */
	public String toString() {
		return "Permit[" +numberOfPermits+", "+period+", "+valuations+", "+name+"]";
	}
	
	/**
	 * Internal constructor to create a Permit from a  representation.
	 * @param json_data The raw json data that will be parsed.
	 */
    public Permit(JSONObject json_data) {
        //System.out.println(json_data);
        
        try {
            // Number of Permits
            this.numberOfPermits = new NumberOfPermits((JSONObject)json_data.get("Number of Permits"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Permit; the field numberOfPermits was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Permit; the field numberOfPermits had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Period
            this.period = new Period((JSONObject)json_data.get("Period"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Permit; the field period was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Permit; the field period had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Valuations
            this.valuations = new Valuations((JSONObject)json_data.get("Valuations"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Permit; the field valuations was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Permit; the field valuations had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Name
            this.name = (String)json_data.get("Name");
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Permit; the field name was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Permit; the field name had the wrong structure.");
    		e.printStackTrace();
        }
        
	}	
}