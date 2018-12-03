package corgis.video_games.domain;

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
public class AllPlaystyles {
	
    // The mean time that players reported completing the game in any way, in hours. This is the average over all the other categories.
    private Double average;
    // The median time that players reported completing the game in any way, in hours. This is the median over all the other categories.
    private Double median;
    // The number of players that reported completing the game in any way. This is the count over all the other categories.
    private Integer polled;
    // The slowest time that players reported completing the game in any way, in hours. This is the minimum over all the other categories.
    private Double leisure;
    // The fastest time that players reported completing the game in any way, in hours. This is the maximum over all the other categories.
    private Double rushed;
    
    
    /**
     * The mean time that players reported completing the game in any way, in hours. This is the average over all the other categories.
     * @return Double
     */
    public Double getAverage() {
        return this.average;
    }
    
    
    
    /**
     * The median time that players reported completing the game in any way, in hours. This is the median over all the other categories.
     * @return Double
     */
    public Double getMedian() {
        return this.median;
    }
    
    
    
    /**
     * The number of players that reported completing the game in any way. This is the count over all the other categories.
     * @return Integer
     */
    public Integer getPolled() {
        return this.polled;
    }
    
    
    
    /**
     * The slowest time that players reported completing the game in any way, in hours. This is the minimum over all the other categories.
     * @return Double
     */
    public Double getLeisure() {
        return this.leisure;
    }
    
    
    
    /**
     * The fastest time that players reported completing the game in any way, in hours. This is the maximum over all the other categories.
     * @return Double
     */
    public Double getRushed() {
        return this.rushed;
    }
    
    
    
	
	/**
	 * Creates a string based representation of this AllPlaystyles.
	
	 * @return String
	 */
	public String toString() {
		return "AllPlaystyles[" +average+", "+median+", "+polled+", "+leisure+", "+rushed+"]";
	}
	
	/**
	 * Internal constructor to create a AllPlaystyles from a  representation.
	 * @param json_data The raw json data that will be parsed.
	 */
    public AllPlaystyles(JSONObject json_data) {
        //System.out.println(json_data);
        
        try {
            // Average
            this.average = ((Number)json_data.get("Average")).doubleValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a AllPlaystyles; the field average was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a AllPlaystyles; the field average had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Median
            this.median = ((Number)json_data.get("Median")).doubleValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a AllPlaystyles; the field median was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a AllPlaystyles; the field median had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Polled
            this.polled = ((Number)json_data.get("Polled")).intValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a AllPlaystyles; the field polled was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a AllPlaystyles; the field polled had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Leisure
            this.leisure = ((Number)json_data.get("Leisure")).doubleValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a AllPlaystyles; the field leisure was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a AllPlaystyles; the field leisure had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Rushed
            this.rushed = ((Number)json_data.get("Rushed")).doubleValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a AllPlaystyles; the field rushed was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a AllPlaystyles; the field rushed had the wrong structure.");
    		e.printStackTrace();
        }
        
	}	
}