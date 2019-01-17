package corgis.food_access.domain;

import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import corgis.food_access.domain.Seniors;
import corgis.food_access.domain.LowIncomePeople;
import corgis.food_access.domain.Children;
import corgis.food_access.domain.People;

/**
 * 
 */
public class LowAccessNumbers {
	
    // Age 65+
    private Seniors seniors;
    // Low income is defined as annual family income at or below 200 percent of the Federal poverty threshold for family size.
    private LowIncomePeople lowIncomePeople;
    // Age 0-17
    private Children children;
    private People people;
    
    
    /**
     * Age 65+
     * @return Seniors
     */
    public Seniors getSeniors() {
        return this.seniors;
    }
    
    
    
    /**
     * Low income is defined as annual family income at or below 200 percent of the Federal poverty threshold for family size.
     * @return LowIncomePeople
     */
    public LowIncomePeople getLowIncomePeople() {
        return this.lowIncomePeople;
    }
    
    
    
    /**
     * Age 0-17
     * @return Children
     */
    public Children getChildren() {
        return this.children;
    }
    
    
    
    /**
     * 
     * @return People
     */
    public People getPeople() {
        return this.people;
    }
    
    
    
	
	/**
	 * Creates a string based representation of this LowAccessNumbers.
	
	 * @return String
	 */
	public String toString() {
		return "LowAccessNumbers[" +seniors+", "+lowIncomePeople+", "+children+", "+people+"]";
	}
	
	/**
	 * Internal constructor to create a LowAccessNumbers from a  representation.
	 * @param json_data The raw json data that will be parsed.
	 */
    public LowAccessNumbers(JSONObject json_data) {
        //System.out.println(json_data);
        
        try {
            // Seniors
            this.seniors = new Seniors((JSONObject)json_data.get("Seniors"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a LowAccessNumbers; the field seniors was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a LowAccessNumbers; the field seniors had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Low Income People
            this.lowIncomePeople = new LowIncomePeople((JSONObject)json_data.get("Low Income People"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a LowAccessNumbers; the field lowIncomePeople was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a LowAccessNumbers; the field lowIncomePeople had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Children
            this.children = new Children((JSONObject)json_data.get("Children"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a LowAccessNumbers; the field children was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a LowAccessNumbers; the field children had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // People
            this.people = new People((JSONObject)json_data.get("People"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a LowAccessNumbers; the field people was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a LowAccessNumbers; the field people had the wrong structure.");
    		e.printStackTrace();
        }
        
	}	
}