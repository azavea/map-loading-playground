import Link from "next/link";
import Head from "next/head";
import { withRouter, useRouter } from "next/router";

import styles from "../styles/Page.module.css";

const Page = ({ children, title, slug }) => {
  return (
    <div className={styles.app}>
      <div className={styles.content}>
        <h2>Philadelphia</h2>
        <p className="large">
          Philadelphia will see increased hazards in the future—in addition to
          risk that it will also experience. Did we mention hazard and risk are
          different?
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In venenatis
          ligula aliquam magna elementum, in dapibus nisl pulvinar. In venenatis
          rutrum nisl, at rhoncus risus varius sit amet. Ut ut eros eros.
          Vivamus tincidunt quam urna, ut malesuada eros viverra sit amet. Nam
          est urna, ultricies id mauris sit amet, sodales fringilla ante. Ut
          nunc nulla, convallis eu nisl in, pulvinar cursus augue. Nullam
          dictum, metus ac suscipit aliquet, mi erat commodo velit, non interdum
          eros magna vel ligula.
        </p>
      </div>
      <div className={styles.map}>{children}</div>
    </div>
  );
};

export default Page;
