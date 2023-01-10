import { useState, useEffect } from "react";

//Este hook sirve para hacer la paginacion, regresa los datos y funciones
//que necesite el componente react-paginate (Esto es paginacion desde el front)
const usePagination = (dataSet = [], itemsPerPage = 10) => {
  //Elementos actuales
  const [currentItems, setCurrentItems] = useState([]);
  //Conteo de paginas actuales
  const [pageCount, setPageCount] = useState(0);
  //el offset actual
  const [itemOffset, setItemOffset] = useState(0);

  //Este useEffect se ejecuta cada que itemOffest, itemsPerPage y dataSet cambien
  //dataSet es nuestro arreglo de elementos
  useEffect(() => {
    if (!dataSet) return;
    //Calculamos el nuevo offset
    const endOffset = itemOffset + itemsPerPage;
    //Asignamos que los items actuales sea un slice del arreglo de itemOffset, hasta
    //el final del offset, al inicio, si son 9, sera de 0 a 9
    setCurrentItems(dataSet.slice(itemOffset, endOffset));
    //Sacamos el numero de paginas, dividiendo el largo de los datos entre los
    //itemos que queremos por pagina, y usamos Math.ceil para redondear
    setPageCount(Math.ceil(dataSet.length / itemsPerPage));
    //Esto para que se vea suave al momento de cambiar de pagina
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [itemOffset, itemsPerPage, dataSet]);

  //Esta funcion calcula el nuevo offest de la pagina, el evento ya trae la pagina
  //seleccionada, y la operacion calcula el nuevo offset en base a la pagina seleccionada
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % dataSet.length;
    setItemOffset(newOffset);
  };

  //Retornamos los items actuales
  //el pageCount
  //Y la funcion para manejar el clic
  return {
    currentItems,
    pageCount,
    handlePageClick,
  };
};

export default usePagination;
