package corgis.election.domain;

import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import corgis.election.domain.RandPaul;
import corgis.election.domain.RickSantorum;
import corgis.election.domain.MartinOmalley;
import corgis.election.domain.NoPreference;
import corgis.election.domain.ChrisChristie;
import corgis.election.domain.JebBush;
import corgis.election.domain.HillaryClinton;
import corgis.election.domain.JohnKasich;
import corgis.election.domain.DonaldTrump;
import corgis.election.domain.Uncommitted;
import corgis.election.domain.MikeHuckabee;
import corgis.election.domain.MarcoRubio;
import corgis.election.domain.BernieSanders;
import corgis.election.domain.CarlyFiorina;
import corgis.election.domain.BenCarson;
import corgis.election.domain.TedCruz;

/**
 * 
 */
public class VoteData {
	
    private RandPaul randPaul;
    private RickSantorum rickSantorum;
    private MartinOmalley martinOmalley;
    private NoPreference noPreference;
    private ChrisChristie chrisChristie;
    private JebBush jebBush;
    private HillaryClinton hillaryClinton;
    private JohnKasich johnKasich;
    private DonaldTrump donaldTrump;
    private Uncommitted uncommitted;
    private MikeHuckabee mikeHuckabee;
    private MarcoRubio marcoRubio;
    private BernieSanders bernieSanders;
    private CarlyFiorina carlyFiorina;
    private BenCarson benCarson;
    private TedCruz tedCruz;
    
    
    /**
     * 
     * @return RandPaul
     */
    public RandPaul getRandPaul() {
        return this.randPaul;
    }
    
    
    
    /**
     * 
     * @return RickSantorum
     */
    public RickSantorum getRickSantorum() {
        return this.rickSantorum;
    }
    
    
    
    /**
     * 
     * @return MartinOmalley
     */
    public MartinOmalley getMartinOmalley() {
        return this.martinOmalley;
    }
    
    
    
    /**
     * 
     * @return NoPreference
     */
    public NoPreference getNoPreference() {
        return this.noPreference;
    }
    
    
    
    /**
     * 
     * @return ChrisChristie
     */
    public ChrisChristie getChrisChristie() {
        return this.chrisChristie;
    }
    
    
    
    /**
     * 
     * @return JebBush
     */
    public JebBush getJebBush() {
        return this.jebBush;
    }
    
    
    
    /**
     * 
     * @return HillaryClinton
     */
    public HillaryClinton getHillaryClinton() {
        return this.hillaryClinton;
    }
    
    
    
    /**
     * 
     * @return JohnKasich
     */
    public JohnKasich getJohnKasich() {
        return this.johnKasich;
    }
    
    
    
    /**
     * 
     * @return DonaldTrump
     */
    public DonaldTrump getDonaldTrump() {
        return this.donaldTrump;
    }
    
    
    
    /**
     * 
     * @return Uncommitted
     */
    public Uncommitted getUncommitted() {
        return this.uncommitted;
    }
    
    
    
    /**
     * 
     * @return MikeHuckabee
     */
    public MikeHuckabee getMikeHuckabee() {
        return this.mikeHuckabee;
    }
    
    
    
    /**
     * 
     * @return MarcoRubio
     */
    public MarcoRubio getMarcoRubio() {
        return this.marcoRubio;
    }
    
    
    
    /**
     * 
     * @return BernieSanders
     */
    public BernieSanders getBernieSanders() {
        return this.bernieSanders;
    }
    
    
    
    /**
     * 
     * @return CarlyFiorina
     */
    public CarlyFiorina getCarlyFiorina() {
        return this.carlyFiorina;
    }
    
    
    
    /**
     * 
     * @return BenCarson
     */
    public BenCarson getBenCarson() {
        return this.benCarson;
    }
    
    
    
    /**
     * 
     * @return TedCruz
     */
    public TedCruz getTedCruz() {
        return this.tedCruz;
    }
    
    
    
	
	/**
	 * Creates a string based representation of this VoteData.
	
	 * @return String
	 */
	public String toString() {
		return "VoteData[" +randPaul+", "+rickSantorum+", "+martinOmalley+", "+noPreference+", "+chrisChristie+", "+jebBush+", "+hillaryClinton+", "+johnKasich+", "+donaldTrump+", "+uncommitted+", "+mikeHuckabee+", "+marcoRubio+", "+bernieSanders+", "+carlyFiorina+", "+benCarson+", "+tedCruz+"]";
	}
	
	/**
	 * Internal constructor to create a VoteData from a  representation.
	 * @param json_data The raw json data that will be parsed.
	 */
    public VoteData(JSONObject json_data) {
        //System.out.println(json_data);
        
        try {
            // Rand Paul
            this.randPaul = new RandPaul((JSONObject)json_data.get("Rand Paul"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a VoteData; the field randPaul was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a VoteData; the field randPaul had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Rick Santorum
            this.rickSantorum = new RickSantorum((JSONObject)json_data.get("Rick Santorum"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a VoteData; the field rickSantorum was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a VoteData; the field rickSantorum had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Martin O'Malley
            this.martinOmalley = new MartinOmalley((JSONObject)json_data.get("Martin O'Malley"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a VoteData; the field martinOmalley was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a VoteData; the field martinOmalley had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // No Preference
            this.noPreference = new NoPreference((JSONObject)json_data.get("No Preference"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a VoteData; the field noPreference was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a VoteData; the field noPreference had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Chris Christie
            this.chrisChristie = new ChrisChristie((JSONObject)json_data.get("Chris Christie"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a VoteData; the field chrisChristie was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a VoteData; the field chrisChristie had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Jeb Bush
            this.jebBush = new JebBush((JSONObject)json_data.get("Jeb Bush"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a VoteData; the field jebBush was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a VoteData; the field jebBush had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Hillary Clinton
            this.hillaryClinton = new HillaryClinton((JSONObject)json_data.get("Hillary Clinton"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a VoteData; the field hillaryClinton was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a VoteData; the field hillaryClinton had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // John Kasich
            this.johnKasich = new JohnKasich((JSONObject)json_data.get("John Kasich"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a VoteData; the field johnKasich was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a VoteData; the field johnKasich had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Donald Trump
            this.donaldTrump = new DonaldTrump((JSONObject)json_data.get("Donald Trump"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a VoteData; the field donaldTrump was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a VoteData; the field donaldTrump had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Uncommitted
            this.uncommitted = new Uncommitted((JSONObject)json_data.get("Uncommitted"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a VoteData; the field uncommitted was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a VoteData; the field uncommitted had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Mike Huckabee
            this.mikeHuckabee = new MikeHuckabee((JSONObject)json_data.get("Mike Huckabee"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a VoteData; the field mikeHuckabee was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a VoteData; the field mikeHuckabee had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Marco Rubio
            this.marcoRubio = new MarcoRubio((JSONObject)json_data.get("Marco Rubio"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a VoteData; the field marcoRubio was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a VoteData; the field marcoRubio had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Bernie Sanders
            this.bernieSanders = new BernieSanders((JSONObject)json_data.get("Bernie Sanders"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a VoteData; the field bernieSanders was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a VoteData; the field bernieSanders had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Carly Fiorina
            this.carlyFiorina = new CarlyFiorina((JSONObject)json_data.get("Carly Fiorina"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a VoteData; the field carlyFiorina was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a VoteData; the field carlyFiorina had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Ben Carson
            this.benCarson = new BenCarson((JSONObject)json_data.get("Ben Carson"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a VoteData; the field benCarson was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a VoteData; the field benCarson had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Ted Cruz
            this.tedCruz = new TedCruz((JSONObject)json_data.get("Ted Cruz"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a VoteData; the field tedCruz was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a VoteData; the field tedCruz had the wrong structure.");
    		e.printStackTrace();
        }
        
	}	
}