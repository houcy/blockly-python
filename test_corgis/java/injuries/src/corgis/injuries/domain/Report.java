package corgis.injuries.domain;

import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import corgis.injuries.domain.Address;
import corgis.injuries.domain.Industry;
import corgis.injuries.domain.Statistics;
import corgis.injuries.domain.Business;

/**
 * 
 */
public class Report {
	
    private Address address;
    private Industry industry;
    private Statistics statistics;
    private Business business;
    private Integer year;
    
    
    /**
     * 
     * @return Address
     */
    public Address getAddress() {
        return this.address;
    }
    
    
    
    /**
     * 
     * @return Industry
     */
    public Industry getIndustry() {
        return this.industry;
    }
    
    
    
    /**
     * 
     * @return Statistics
     */
    public Statistics getStatistics() {
        return this.statistics;
    }
    
    
    
    /**
     * 
     * @return Business
     */
    public Business getBusiness() {
        return this.business;
    }
    
    
    
    /**
     * 
     * @return Integer
     */
    public Integer getYear() {
        return this.year;
    }
    
    
    
	
	/**
	 * Creates a string based representation of this Report.
	
	 * @return String
	 */
	public String toString() {
		return "Report[" +address+", "+industry+", "+statistics+", "+business+", "+year+"]";
	}
	
	/**
	 * Internal constructor to create a Report from a  representation.
	 * @param json_data The raw json data that will be parsed.
	 */
    public Report(JSONObject json_data) {
        //System.out.println(json_data);
        
        try {
            // address
            this.address = new Address((JSONObject)json_data.get("address"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Report; the field address was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Report; the field address had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // industry
            this.industry = new Industry((JSONObject)json_data.get("industry"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Report; the field industry was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Report; the field industry had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // statistics
            this.statistics = new Statistics((JSONObject)json_data.get("statistics"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Report; the field statistics was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Report; the field statistics had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // business
            this.business = new Business((JSONObject)json_data.get("business"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Report; the field business was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Report; the field business had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // year
            this.year = ((Number)json_data.get("year")).intValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Report; the field year was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Report; the field year had the wrong structure.");
    		e.printStackTrace();
        }
        
	}	
}