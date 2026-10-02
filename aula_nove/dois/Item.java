public class Item implements Comparable{
    private int codigo;

    public Item(int codigo) {
        this.codigo = codigo;
    }

    public int getCodigo() {
        return codigo;
    }

    public void setCodigo(int codigo) {
        this.codigo = codigo;
    }

    @Override
    public String toString() {
        return "Item{" +
                "codigo=" + codigo +
                '}';
    }

    @Override
    public boolean equals(Object obj) {
        return this.codigo == ((Item)obj).codigo;
    }

    @Override
    public int compareTo(Object o) {
        if(this.codigo == ((Item)o).codigo){
            return 0;
        }else if(this.codigo > ((Item)o).codigo){
            return 1;
        }else{
            return -1;
        }
    }//
}//class
