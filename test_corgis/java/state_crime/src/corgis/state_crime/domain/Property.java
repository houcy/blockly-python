package corgis.state_crime.domain;

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
public class Property {
	
    // This property reflects the number of burglaries, or entry into a building illegally with intent to commit a crime, especially theft.
    private Integer burglary;
    // This property reflects the number of burglaries, or theft of personal property.
    private Integer larceny;
    // This property reflects all of the Property-related crimes, including burglaries, larcenies, and motor crimes.
    private Integer all;
    // This property reflects the number of crimes where a motor vehicle was stolen.
    private Integer motor;
    
    
    /**
     * This property reflects the number of burglaries, or entry into a building illegally with intent to commit a crime, especially theft.
     * @return Integer
     */
    public Integer getBurglary() {
        return this.burglary;
    }
    
    
    
    /**
     * This property reflects the number of burglaries, or theft of personal property.
     * @return Integer
     */
    public Integer getLarceny() {
        return this.larceny;
    }
    
    
    
    /**
     * This property reflects all of the Property-related crimes, including burglaries, larcenies, and motor crimes.
     * @return Integer
     */
    public Integer getAll() {
        return this.all;
    }
    
    
    
    /**
     * This property reflects the number of crimes where a motor vehicle was stolen.
     * @return Integer
     */
    public Integer getMotor() {
        return this.motor;
    }
    
    
    
	
	/**
	 * Creates a string based representation of this Property.
	
	 * @return String
	 */
	public String toString() {
		return "Property[" +burglary+", "+larceny+", "+all+", "+motor+"]";
	}
	
	/**
	 * Internal constructor to create a Property from a  representation.
	 * @param json_data The raw json data that will be parsed.
	 */
    public Property(JSONObject json_data) {
        //System.out.println(json_data);
        
        try {
            // Burglary
            this.burglary = ((Number)json_data.get("Burglary")).intValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Property; the field burglary was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Property; the field burglary had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Larceny
            this.larceny = ((Number)json_data.get("Larceny")).intValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Property; the field larceny was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Property; the field larceny had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // All
            this.all = ((Number)json_data.get("All")).intValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Property; the field all was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Property; the field all had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Motor
            this.motor = ((Number)json_data.get("Motor")).intValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Property; the field motor was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Property; the field motor had the wrong structure.");
    		e.printStackTrace();
        }
        
	}	
}