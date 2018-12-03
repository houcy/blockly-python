package corgis.earthquakes.domain;

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
public class Impact {
	
    // Earthquake magnitude is a measure of the size of an earthquake at its source. It is a logarithmic measure. At the same distance from the earthquake, the amplitude of the seismic waves from which the magnitude is determined are approximately 10 times as large during a magnitude 5 earthquake as during a magnitude 4 earthquake. The total amount of energy released by the earthquake usually goes up by a larger factor; for many commonly used magnitude types, the total energy of an average earthquake goes up by a factor of approximately 32 for each unit increase in magnitude. Typically ranges from -1 (very tiny) to 10 (incredibly powerful).
    private Double magnitude;
    // A number describing how significant the event is. Larger numbers indicate a more significant event. This value is determined on a number of factors, including magnitude, maximum MMI, felt reports, and estimated impact. Ranges from 0 to 1000.
    private Integer significance;
    // In general, the smaller this number, the more reliable is the calculated horizontal position of the earthquake. Specifically, this means the largest azimuthal gap between azimuthally adjacent stations (in degrees). Earthquake locations in which the azimuthal gap exceeds 180 degrees typically have large location and depth uncertainties. Ranges from 0 to 180.
    private Double gap;
    
    
    /**
     * Earthquake magnitude is a measure of the size of an earthquake at its source. It is a logarithmic measure. At the same distance from the earthquake, the amplitude of the seismic waves from which the magnitude is determined are approximately 10 times as large during a magnitude 5 earthquake as during a magnitude 4 earthquake. The total amount of energy released by the earthquake usually goes up by a larger factor; for many commonly used magnitude types, the total energy of an average earthquake goes up by a factor of approximately 32 for each unit increase in magnitude. Typically ranges from -1 (very tiny) to 10 (incredibly powerful).
     * @return Double
     */
    public Double getMagnitude() {
        return this.magnitude;
    }
    
    
    
    /**
     * A number describing how significant the event is. Larger numbers indicate a more significant event. This value is determined on a number of factors, including magnitude, maximum MMI, felt reports, and estimated impact. Ranges from 0 to 1000.
     * @return Integer
     */
    public Integer getSignificance() {
        return this.significance;
    }
    
    
    
    /**
     * In general, the smaller this number, the more reliable is the calculated horizontal position of the earthquake. Specifically, this means the largest azimuthal gap between azimuthally adjacent stations (in degrees). Earthquake locations in which the azimuthal gap exceeds 180 degrees typically have large location and depth uncertainties. Ranges from 0 to 180.
     * @return Double
     */
    public Double getGap() {
        return this.gap;
    }
    
    
    
	
	/**
	 * Creates a string based representation of this Impact.
	
	 * @return String
	 */
	public String toString() {
		return "Impact[" +magnitude+", "+significance+", "+gap+"]";
	}
	
	/**
	 * Internal constructor to create a Impact from a  representation.
	 * @param json_data The raw json data that will be parsed.
	 */
    public Impact(JSONObject json_data) {
        //System.out.println(json_data);
        
        try {
            // magnitude
            this.magnitude = ((Number)json_data.get("magnitude")).doubleValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Impact; the field magnitude was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Impact; the field magnitude had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // significance
            this.significance = ((Number)json_data.get("significance")).intValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Impact; the field significance was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Impact; the field significance had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // gap
            this.gap = ((Number)json_data.get("gap")).doubleValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Impact; the field gap was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Impact; the field gap had the wrong structure.");
    		e.printStackTrace();
        }
        
	}	
}