import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.TreeSet;

public class SetTest {
    public static void main(String[] args) {
        HashSet<Integer> set1 = new HashSet<>();
        set1.add(10);
        set1.add(2);
        set1.add(7);
        set1.add(1);
        System.out.println("HashSet: "+set1);

        LinkedHashSet<Integer> set2 = new  LinkedHashSet<>();
        set2.add(10);
        set2.add(2);
        set2.add(7);
        set2.add(1);
        System.out.println("LinkedHashSet: "+set2);

        TreeSet<Integer> set3 = new TreeSet<>();
        set3.add(10);
        set3.add(2);
        set3.add(7);
        set3.add(1);
        System.out.println("TreeSet: "+set3);

        TreeSet<Item> set4 = new TreeSet<>();
        set4.add(new Item(10));
        set4.add(new Item(2));
        set4.add(new Item(7));
        set4.add(new Item(1));
        System.out.println("TreeSet: "+set4);


    }
}
