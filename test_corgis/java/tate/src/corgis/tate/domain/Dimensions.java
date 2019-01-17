package corgis.tate.domain;

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
public class Dimensions {
	
    // The width of the piece of art, in millimeters. If it is unknown, this was replaced with "0".
    private Double width;
    // The depth of the piece of art, in millimeters. If it is unknown, this was replaced with "0".
    private Double depth;
    // The height of the piece of art, in millimeters. If it is unknown, this was replaced with "0".
    private Double height;
    
    
    /**
     * The width of the piece of art, in millimeters. If it is unknown, this was replaced with "0".
     * @return Double
     */
    public Double getWidth() {
        return this.width;
    }
    
    
    
    /**
     * The depth of the piece of art, in millimeters. If it is unknown, this was replaced with "0".
     * @return Double
     */
    public Double getDepth() {
        return this.depth;
    }
    
    
    
    /**
     * The height of the piece of art, in millimeters. If it is unknown, this was replaced with "0".
     * @return Double
     */
    public Double getHeight() {
        return this.height;
    }
    
    
    
	
	/**
	 * Creates a string based representation of this Dimensions.
	
	 * @return String
	 */
	public String toString() {
		return "Dimensions[" +width+", "+depth+", "+height+"]";
	}
	
	/**
	 * Internal constructor to create a Dimensions from a  representation.
	 * @param json_data The raw json data that will be parsed.
	 */
    public Dimensions(JSONObject json_data) {
        //System.out.println(json_data);
        
        try {
            // width
            this.width = ((Number)json_data.get("width")).doubleValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Dimensions; the field width was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Dimensions; the field width had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // depth
            this.depth = ((Number)json_data.get("depth")).doubleValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Dimensions; the field depth was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Dimensions; the field depth had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // height
            this.height = ((Number)json_data.get("height")).doubleValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Dimensions; the field height was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Dimensions; the field height had the wrong structure.");
    		e.printStackTrace();
        }
        
	}	
}