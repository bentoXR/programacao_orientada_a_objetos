import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

public class ListTest {
    public static void main(String[] args) {
        ArrayList<Integer> lista1 = new ArrayList<>();
        lista1.add(10);
        lista1.add(2);
        lista1.add(7);
        lista1.add(1);
        System.out.println("arraylist: "+lista1);
        System.out.println(lista1.get(0));
        System.out.println(lista1.get(3));

        LinkedList<String> lista2 = new LinkedList();
        lista2.add("dez");
        lista2.add("dois");
        lista2.add("sete");
        lista2.add("um");
        System.out.println("linkedlist: "+lista2);
        System.out.println(lista2.getFirst());
        System.out.println(lista2.getLast());

        ArrayDeque<Item> lista3 = new ArrayDeque<>();
        lista3.add(new Item(10));
        lista3.offer(new Item(2));
        lista3.offerFirst(new Item(7));
        lista3.offerLast(new Item(3));
        System.out.println("arraydeque: "+lista3);
        System.out.println(lista3.peekLast());
        System.out.println(lista3.peekFirst());
        System.out.println("arraydeque: "+lista3);
        System.out.println(lista3.pollFirst());
        System.out.println(lista3.pollLast());
        System.out.println("arraydeque: "+lista3);


    }//main
}//class
