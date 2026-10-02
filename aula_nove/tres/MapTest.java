import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.TreeMap;

public class MapTest {
    public static void main(String[] args) {
        HashMap<String,Integer> map1 = new HashMap<>();
        map1.put("dez",10);
        map1.put("dois",2);
        map1.put("sete",7);
        map1.put("um",1);
        System.out.println("HashMap: "+map1);

        LinkedHashMap<String,Integer> map2 = new LinkedHashMap<>();
        map2.put("dez",10);
        map2.put("dois",2);
        map2.put("sete",7);
        map2.put("um",1);
        System.out.println("LinkedHashMap: "+map2);

        TreeMap<String,Integer> map3 = new TreeMap<>();
        map3.put("um",1);
        map3.put("dez",10);
        map3.put("sete",7);
        map3.put("dois",2);
        System.out.println("TreeMap: "+map3);

        TreeMap<Item,Integer> map4 = new TreeMap<>();
        map4.put(new Item(10),10);
        map4.put(new Item(2),2);
        map4.put(new Item(7),7);
        map4.put(new Item(1),1);
        System.out.println("TreeMap: "+map4);


    }
}//class
