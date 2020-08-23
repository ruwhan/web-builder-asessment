import React from "react";
import PropTypes from "prop-types";
import grapesjs from "grapesjs";
import "grapesjs-indexeddb";
import "grapesjs-preset-webpage";

import 'grapesjs/dist/css/grapes.min.css';

import storage from "../../storageHelpers";
import gjsPresetWebpageOpts from "./gjs-preset-webpage-opts";

(function() {
  grapesjs.plugins.add('grapesjs-firebase-firestore', (editor, opts = {}) => {
    const options = { ...{
      // Firebase API key
      apiKey: '',

      // Firebase Auth domain
      authDomain: '',

      // Cloud Firestore project ID
      projectId: '',

      // Document id
      docId: 'gjs',

      // Collection name
      collectionName: 'templates',

      // Enable support for offline data persistence
      enableOffline: true,

      // Database settings (https://firebase.google.com/docs/reference/js/firebase.firestore.Settings)
      settings: { timestampsInSnapshots: true },
    },  ...opts };

    const sm = editor.StorageManager;
    const storageName = 'firestore';

    let db;
    let doc;
    let docId;
    let collection;

    const getDoc = () => doc;
    const getDocId = () => docId || options.docId;

    const getAsyncCollection = (clb) => {
      if (collection) return clb(collection);

      const callback = () => {
        db = storage();
        collection = db.collection(options.collectionName);
        clb(collection);
      }

      callback();
    };

    const getAsyncDoc = (clb) => {
      getAsyncCollection(cll => {
        doc = cll.doc(getDocId());
        clb(doc);
      });
    };

    sm.add(storageName, {
      getDoc,

      getDocId,

      setDocId(id) {
        docId = id;
      },

      load(keys, clb, clbError) {
        getAsyncDoc(doc => {
          doc.get()
          .then(doc => doc.exists && clb(doc.data()))
          .catch(clbError);
        });
      },

      store(data, clb, clbError) {
        getAsyncDoc(doc => {
          doc.set(data)
          .then(clb)
          .catch(clbError);
        });
      }
    });
  });
})();

export class GrapesEditor extends React.Component {
  componentDidMount() {
    const { storeId } = this.props;
    this.editor = grapesjs.init({
      container: '#gjs',
      presetType: 'webpage',
      storageManager: {
        type: 'firestore',
      },
      plugins: [
        'grapesjs-firebase-firestore', 
        'gjs-preset-webpage',
      ],
      pluginsOpts: {
        'grapesjs-firebase-firestore': {
          docId: `${storeId}-`,
          apiKey: 'AIzaSyA1Vf9MFXBMUVZNuvxugCtf3qxIYbaSBNI',
          authDomain: 'test-login-button.firebaseapp.com',
          projectId: 'test-login-button',
        },
        'gjs-preset-webpage': gjsPresetWebpageOpts,
      }
    });
  }

  render() {
    return (
      <>
        <div id="gjs"></div>
      </>
    );
  }
}

GrapesEditor.propTypes = {
  storeId: PropTypes.string.isRequired,
}

export default GrapesEditor;
