package corgis.energy.domain;

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
public class ElectricPower {
	
    // Coal consumed by the electric power sector in billion BTU.
    private Double coal;
    // Distillate fuel oil consumed by the electrical power sector in billion BTU.
    private Double distillateFuelOil;
    // Wood and waste consumed by the electric power sector in billion BTU.
    private Double wood;
    // Natural gas consumed by the electric power sector (including supplemental gaseous fuels) in billion BTU.
    private Double naturalGas;
    
    
    /**
     * Coal consumed by the electric power sector in billion BTU.
     * @return Double
     */
    public Double getCoal() {
        return this.coal;
    }
    
    
    
    /**
     * Distillate fuel oil consumed by the electrical power sector in billion BTU.
     * @return Double
     */
    public Double getDistillateFuelOil() {
        return this.distillateFuelOil;
    }
    
    
    
    /**
     * Wood and waste consumed by the electric power sector in billion BTU.
     * @return Double
     */
    public Double getWood() {
        return this.wood;
    }
    
    
    
    /**
     * Natural gas consumed by the electric power sector (including supplemental gaseous fuels) in billion BTU.
     * @return Double
     */
    public Double getNaturalGas() {
        return this.naturalGas;
    }
    
    
    
	
	/**
	 * Creates a string based representation of this ElectricPower.
	
	 * @return String
	 */
	public String toString() {
		return "ElectricPower[" +coal+", "+distillateFuelOil+", "+wood+", "+naturalGas+"]";
	}
	
	/**
	 * Internal constructor to create a ElectricPower from a  representation.
	 * @param json_data The raw json data that will be parsed.
	 */
    public ElectricPower(JSONObject json_data) {
        //System.out.println(json_data);
        
        try {
            // Coal
            this.coal = ((Number)json_data.get("Coal")).doubleValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a ElectricPower; the field coal was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a ElectricPower; the field coal had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Distillate Fuel Oil
            this.distillateFuelOil = ((Number)json_data.get("Distillate Fuel Oil")).doubleValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a ElectricPower; the field distillateFuelOil was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a ElectricPower; the field distillateFuelOil had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Wood
            this.wood = ((Number)json_data.get("Wood")).doubleValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a ElectricPower; the field wood was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a ElectricPower; the field wood had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Natural Gas
            this.naturalGas = ((Number)json_data.get("Natural Gas")).doubleValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a ElectricPower; the field naturalGas was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a ElectricPower; the field naturalGas had the wrong structure.");
    		e.printStackTrace();
        }
        
	}	
}