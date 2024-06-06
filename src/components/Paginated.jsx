import style from '../styles/Paginated.module.css';

const Paginated = ({ productos, paginado, paginaActual }) => {
  const pages = [];
  for (let i = 1; i <= Math.ceil(productos / 10); i++) {
    pages.push(i);
  }
  return (
    <nav className={style.container}>
      <ul>
        <button className={style.back} onClick={() => paginado(paginaActual - 1)} disabled={paginaActual === 1}>«</button>
        {
          pages.map(page => {
            return (
              <button className={style.buttons} key={page} onClick={() => paginado(page)}>{page}</button>
            )
          })
        }
        <button className={style.next} onClick={() => paginado(paginaActual +1)} disabled={paginaActual === 8}>»</button>

      </ul>
    </nav>
  )
}

export default Paginated;