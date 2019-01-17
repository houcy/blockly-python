package corgis.medal_of_honor.domain;

import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import corgis.medal_of_honor.domain.Location;
import corgis.medal_of_honor.domain.Date;

/**
 * 
 */
public class Awarded {
	
    private String issued;
    private String citation;
    private Integer generalOrderNumber;
    private String accreditedTo;
    private Location location;
    private Date date;
    
    
    /**
     * 
     * @return String
     */
    public String getIssued() {
        return this.issued;
    }
    
    
    
    /**
     * 
     * @return String
     */
    public String getCitation() {
        return this.citation;
    }
    
    
    
    /**
     * 
     * @return Integer
     */
    public Integer getGeneralOrderNumber() {
        return this.generalOrderNumber;
    }
    
    
    
    /**
     * 
     * @return String
     */
    public String getAccreditedTo() {
        return this.accreditedTo;
    }
    
    
    
    /**
     * 
     * @return Location
     */
    public Location getLocation() {
        return this.location;
    }
    
    
    
    /**
     * 
     * @return Date
     */
    public Date getDate() {
        return this.date;
    }
    
    
    
	
	/**
	 * Creates a string based representation of this Awarded.
	
	 * @return String
	 */
	public String toString() {
		return "Awarded[" +issued+", "+citation+", "+generalOrderNumber+", "+accreditedTo+", "+location+", "+date+"]";
	}
	
	/**
	 * Internal constructor to create a Awarded from a  representation.
	 * @param json_data The raw json data that will be parsed.
	 */
    public Awarded(JSONObject json_data) {
        //System.out.println(json_data);
        
        try {
            // issued
            this.issued = (String)json_data.get("issued");
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Awarded; the field issued was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Awarded; the field issued had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // citation
            this.citation = (String)json_data.get("citation");
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Awarded; the field citation was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Awarded; the field citation had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // General Order number
            this.generalOrderNumber = ((Number)json_data.get("General Order number")).intValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Awarded; the field generalOrderNumber was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Awarded; the field generalOrderNumber had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // accredited to
            this.accreditedTo = (String)json_data.get("accredited to");
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Awarded; the field accreditedTo was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Awarded; the field accreditedTo had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // location
            this.location = new Location((JSONObject)json_data.get("location"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Awarded; the field location was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Awarded; the field location had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // date
            this.date = new Date((JSONObject)json_data.get("date"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Awarded; the field date was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Awarded; the field date had the wrong structure.");
    		e.printStackTrace();
        }
        
	}	
}