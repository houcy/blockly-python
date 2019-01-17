package corgis.slavery.domain;

import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import corgis.slavery.domain.Buyer;
import corgis.slavery.domain.Transaction;
import corgis.slavery.domain.Slave;
import corgis.slavery.domain.Seller;

/**
 * 
 */
public class TransactionRecord {
	
    private Buyer buyer;
    private Transaction transaction;
    private Slave slave;
    private Seller seller;
    
    
    /**
     * 
     * @return Buyer
     */
    public Buyer getBuyer() {
        return this.buyer;
    }
    
    
    
    /**
     * 
     * @return Transaction
     */
    public Transaction getTransaction() {
        return this.transaction;
    }
    
    
    
    /**
     * 
     * @return Slave
     */
    public Slave getSlave() {
        return this.slave;
    }
    
    
    
    /**
     * 
     * @return Seller
     */
    public Seller getSeller() {
        return this.seller;
    }
    
    
    
	
	/**
	 * Creates a string based representation of this TransactionRecord.
	
	 * @return String
	 */
	public String toString() {
		return "TransactionRecord[" +buyer+", "+transaction+", "+slave+", "+seller+"]";
	}
	
	/**
	 * Internal constructor to create a TransactionRecord from a  representation.
	 * @param json_data The raw json data that will be parsed.
	 */
    public TransactionRecord(JSONObject json_data) {
        //System.out.println(json_data);
        
        try {
            // Buyer
            this.buyer = new Buyer((JSONObject)json_data.get("Buyer"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a TransactionRecord; the field buyer was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a TransactionRecord; the field buyer had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Transaction
            this.transaction = new Transaction((JSONObject)json_data.get("Transaction"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a TransactionRecord; the field transaction was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a TransactionRecord; the field transaction had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Slave
            this.slave = new Slave((JSONObject)json_data.get("Slave"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a TransactionRecord; the field slave was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a TransactionRecord; the field slave had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Seller
            this.seller = new Seller((JSONObject)json_data.get("Seller"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a TransactionRecord; the field seller was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a TransactionRecord; the field seller had the wrong structure.");
    		e.printStackTrace();
        }
        
	}	
}