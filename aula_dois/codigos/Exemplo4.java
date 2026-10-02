public class Exemplo4 {
    public static void main(String[] args) {
        int n1 = 0, n2 = 0, n3 = 0;
        Scanner sc = new Scanner(System.in);
        System.out.println("digite o primeiro valor");
        n1 = sc.nextInt();
        System.out.println("digite o segundo valor");
        n2 = sc.nextInt();
        System.out.println("digite o terceiro valor");
        n3 = sc.nextInt();
        if(n1>n2 && n1>n3){
            System.out.printf("maior: %d",n1);
        }else if(n2>n3){
            System.out.printf("maior: %d",n2);
        }else {
            System.out.printf("maior: %d",n3);
        }
    }
}
