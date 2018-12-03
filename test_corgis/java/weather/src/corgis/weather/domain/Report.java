package corgis.weather.domain;

import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import corgis.weather.domain.Date;
import corgis.weather.domain.Station;
import corgis.weather.domain.Data;

/**
 * 
 */
public class Report {
	
    private Date date;
    private Station station;
    private Data data;
    
    
    /**
     * 
     * @return Date
     */
    public Date getDate() {
        return this.date;
    }
    
    
    
    /**
     * 
     * @return Station
     */
    public Station getStation() {
        return this.station;
    }
    
    
    
    /**
     * 
     * @return Data
     */
    public Data getData() {
        return this.data;
    }
    
    
    
	
	/**
	 * Creates a string based representation of this Report.
	
	 * @return String
	 */
	public String toString() {
		return "Report[" +date+", "+station+", "+data+"]";
	}
	
	/**
	 * Internal constructor to create a Report from a  representation.
	 * @param json_data The raw json data that will be parsed.
	 */
    public Report(JSONObject json_data) {
        //System.out.println(json_data);
        
        try {
            // Date
            this.date = new Date((JSONObject)json_data.get("Date"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Report; the field date was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Report; the field date had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Station
            this.station = new Station((JSONObject)json_data.get("Station"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Report; the field station was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Report; the field station had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Data
            this.data = new Data((JSONObject)json_data.get("Data"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Report; the field data was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Report; the field data had the wrong structure.");
    		e.printStackTrace();
        }
        
	}	
}