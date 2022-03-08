import { documentToReactComponents as renderRichText } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import styles from '../styles/MainLayout.module.css';
import slugify from 'slugify';
import moment from 'moment';

export const UpdateText = ({ title, published, summary, description, id }) => (
    <div className={styles.update}>
     {published ? <h4>{moment(published, "YYYY-MM-DD").format("MM/DD/YYYY")}</h4> : null}
     {title ? <h1>
                  <a href={`/post/${id}/${moment(published, "YYYY-MM-DD").format("MM/DD/YYYY")}/${slugify(title)}`}>
                    {title}
                  </a>
              </h1> 
            : null
      }
     {summary ? <h2>{summary}</h2> : null}
     {description && renderRichText(description, {
       renderNode: { [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
        {console.log(node)}
        return (
          <img
            className={styles.image}
            src={`https://${node.data.target.fields.file.url}`}
            width="75%"
            alt={node.data.target.fields.description}
          />
        );
      }
     }})}
   </div>
)
