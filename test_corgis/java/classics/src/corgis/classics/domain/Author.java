package corgis.classics.domain;

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
public class Author {
	
    // The recorded year of the author's death. If their death year is unknown, it is replaced with "0".
    private Integer death;
    private String name;
    // The recorded birth year of the author. If their birth year is unknown, it is replaced with "0".
    private Integer birth;
    
    
    /**
     * The recorded year of the author's death. If their death year is unknown, it is replaced with "0".
     * @return Integer
     */
    public Integer getDeath() {
        return this.death;
    }
    
    
    
    /**
     * 
     * @return String
     */
    public String getName() {
        return this.name;
    }
    
    
    
    /**
     * The recorded birth year of the author. If their birth year is unknown, it is replaced with "0".
     * @return Integer
     */
    public Integer getBirth() {
        return this.birth;
    }
    
    
    
	
	/**
	 * Creates a string based representation of this Author.
	
	 * @return String
	 */
	public String toString() {
		return "Author[" +death+", "+name+", "+birth+"]";
	}
	
	/**
	 * Internal constructor to create a Author from a  representation.
	 * @param json_data The raw json data that will be parsed.
	 */
    public Author(JSONObject json_data) {
        //System.out.println(json_data);
        
        try {
            // death
            this.death = ((Number)json_data.get("death")).intValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Author; the field death was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Author; the field death had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // name
            this.name = (String)json_data.get("name");
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Author; the field name was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Author; the field name had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // birth
            this.birth = ((Number)json_data.get("birth")).intValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Author; the field birth was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Author; the field birth had the wrong structure.");
    		e.printStackTrace();
        }
        
	}	
}