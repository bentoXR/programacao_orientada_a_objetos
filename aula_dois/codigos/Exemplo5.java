public class Exemplo {
    public static void main(String[] args) {
        for(int i=0;i<10;i++){
            System.out.println("oi");
        }

        for(int i=10;i>=0;i--){
            System.out.println("mundo");
        }

        for(int i=1;i<=100;i=i+10){
            System.out.println(i);
        }

        int i = 1;
        while(i<=5){
            System.out.println("while");
            i++;
        }

        i = 1;
        do{
            System.out.println("do-while");
            i++;
        }while(i<=5);

    }
}
