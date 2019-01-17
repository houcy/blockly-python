package corgis.slavery.domain;

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
public class SaleDetails {
	
    private Integer pricesListed;
    // Missing values were replaced using the mean of the rest of the category"
    private Double price;
    private String paymentMethod;
    // Missing values were replaced using the mean of the rest of the category
    private Double discountRate;
    private Double predictedInterestRate;
    
    
    /**
     * 
     * @return Integer
     */
    public Integer getPricesListed() {
        return this.pricesListed;
    }
    
    
    
    /**
     * Missing values were replaced using the mean of the rest of the category"
     * @return Double
     */
    public Double getPrice() {
        return this.price;
    }
    
    
    
    /**
     * 
     * @return String
     */
    public String getPaymentMethod() {
        return this.paymentMethod;
    }
    
    
    
    /**
     * Missing values were replaced using the mean of the rest of the category
     * @return Double
     */
    public Double getDiscountRate() {
        return this.discountRate;
    }
    
    
    
    /**
     * 
     * @return Double
     */
    public Double getPredictedInterestRate() {
        return this.predictedInterestRate;
    }
    
    
    
	
	/**
	 * Creates a string based representation of this SaleDetails.
	
	 * @return String
	 */
	public String toString() {
		return "SaleDetails[" +pricesListed+", "+price+", "+paymentMethod+", "+discountRate+", "+predictedInterestRate+"]";
	}
	
	/**
	 * Internal constructor to create a SaleDetails from a  representation.
	 * @param json_data The raw json data that will be parsed.
	 */
    public SaleDetails(JSONObject json_data) {
        //System.out.println(json_data);
        
        try {
            // Prices Listed
            this.pricesListed = ((Number)json_data.get("Prices Listed")).intValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a SaleDetails; the field pricesListed was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a SaleDetails; the field pricesListed had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Price
            this.price = ((Number)json_data.get("Price")).doubleValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a SaleDetails; the field price was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a SaleDetails; the field price had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Payment Method
            this.paymentMethod = (String)json_data.get("Payment Method");
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a SaleDetails; the field paymentMethod was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a SaleDetails; the field paymentMethod had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Discount Rate
            this.discountRate = ((Number)json_data.get("Discount Rate")).doubleValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a SaleDetails; the field discountRate was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a SaleDetails; the field discountRate had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Predicted Interest Rate
            this.predictedInterestRate = ((Number)json_data.get("Predicted Interest Rate")).doubleValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a SaleDetails; the field predictedInterestRate was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a SaleDetails; the field predictedInterestRate had the wrong structure.");
    		e.printStackTrace();
        }
        
	}	
}