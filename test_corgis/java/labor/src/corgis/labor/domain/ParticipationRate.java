package corgis.labor.domain;

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
public class ParticipationRate {
	
    private Double all;
    private Double men;
    private Double women;
    
    
    /**
     * 
     * @return Double
     */
    public Double getAll() {
        return this.all;
    }
    
    
    
    /**
     * 
     * @return Double
     */
    public Double getMen() {
        return this.men;
    }
    
    
    
    /**
     * 
     * @return Double
     */
    public Double getWomen() {
        return this.women;
    }
    
    
    
	
	/**
	 * Creates a string based representation of this ParticipationRate.
	
	 * @return String
	 */
	public String toString() {
		return "ParticipationRate[" +all+", "+men+", "+women+"]";
	}
	
	/**
	 * Internal constructor to create a ParticipationRate from a  representation.
	 * @param json_data The raw json data that will be parsed.
	 */
    public ParticipationRate(JSONObject json_data) {
        //System.out.println(json_data);
        
        try {
            // All
            this.all = ((Number)json_data.get("All")).doubleValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a ParticipationRate; the field all was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a ParticipationRate; the field all had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Men
            this.men = ((Number)json_data.get("Men")).doubleValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a ParticipationRate; the field men was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a ParticipationRate; the field men had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Women
            this.women = ((Number)json_data.get("Women")).doubleValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a ParticipationRate; the field women was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a ParticipationRate; the field women had the wrong structure.");
    		e.printStackTrace();
        }
        
	}	
}