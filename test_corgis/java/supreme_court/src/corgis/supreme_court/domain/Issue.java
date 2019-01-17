package corgis.supreme_court.domain;

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
public class Issue {
	
    private String text;
    private Integer id;
    private String area;
    
    
    /**
     * 
     * @return String
     */
    public String getText() {
        return this.text;
    }
    
    
    
    /**
     * 
     * @return Integer
     */
    public Integer getId() {
        return this.id;
    }
    
    
    
    /**
     * 
     * @return String
     */
    public String getArea() {
        return this.area;
    }
    
    
    
	
	/**
	 * Creates a string based representation of this Issue.
	
	 * @return String
	 */
	public String toString() {
		return "Issue[" +text+", "+id+", "+area+"]";
	}
	
	/**
	 * Internal constructor to create a Issue from a  representation.
	 * @param json_data The raw json data that will be parsed.
	 */
    public Issue(JSONObject json_data) {
        //System.out.println(json_data);
        
        try {
            // text
            this.text = (String)json_data.get("text");
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Issue; the field text was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Issue; the field text had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // id
            this.id = ((Number)json_data.get("id")).intValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Issue; the field id was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Issue; the field id had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // area
            this.area = (String)json_data.get("area");
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Issue; the field area was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Issue; the field area had the wrong structure.");
    		e.printStackTrace();
        }
        
	}	
}