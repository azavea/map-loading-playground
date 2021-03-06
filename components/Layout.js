import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div className="container">
      <Header />
      <main>{children}</main>
      <style jsx>{`
        .container {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          display: flex;
          flex-direction: column;
        }

        main {
          flex: 1;
          height: calc(100% - 48px);
        }
      `}</style>
    </div>
  );
}
