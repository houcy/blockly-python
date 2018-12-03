package corgis.finance.domain;

import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import corgis.finance.domain.Totals;
import corgis.finance.domain.Details;

/**
 * 
 */
public class Record {
	
    // The state that this report was made for (full name, not the two letter abbreviation).
    private String state;
    private Totals totals;
    private Details details;
    // The year that this report was made for.
    private Integer year;
    
    
    /**
     * The state that this report was made for (full name, not the two letter abbreviation).
     * @return String
     */
    public String getState() {
        return this.state;
    }
    
    
    
    /**
     * 
     * @return Totals
     */
    public Totals getTotals() {
        return this.totals;
    }
    
    
    
    /**
     * 
     * @return Details
     */
    public Details getDetails() {
        return this.details;
    }
    
    
    
    /**
     * The year that this report was made for.
     * @return Integer
     */
    public Integer getYear() {
        return this.year;
    }
    
    
    
	
	/**
	 * Creates a string based representation of this Record.
	
	 * @return String
	 */
	public String toString() {
		return "Record[" +state+", "+totals+", "+details+", "+year+"]";
	}
	
	/**
	 * Internal constructor to create a Record from a  representation.
	 * @param json_data The raw json data that will be parsed.
	 */
    public Record(JSONObject json_data) {
        //System.out.println(json_data);
        
        try {
            // State
            this.state = (String)json_data.get("State");
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Record; the field state was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Record; the field state had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Totals
            this.totals = new Totals((JSONObject)json_data.get("Totals"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Record; the field totals was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Record; the field totals had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Details
            this.details = new Details((JSONObject)json_data.get("Details"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Record; the field details was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Record; the field details had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Year
            this.year = ((Number)json_data.get("Year")).intValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Record; the field year was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Record; the field year had the wrong structure.");
    		e.printStackTrace();
        }
        
	}	
}