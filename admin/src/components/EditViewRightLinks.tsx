import { useParams } from 'react-router-dom';
import PreviewButton from './PreviewButton';
import { useEffect, useState } from 'react';
import { useFetchClient } from '@strapi/strapi/admin';
import { PLUGIN_ID } from '../../../contants';

const EditViewRightLinks = () => {
  const { slug: model = '' } = useParams();
  const [url, setUrl] = useState('');
  const fetchClient = useFetchClient();
  useEffect(() => {
    fetchClient
      .get(`/${PLUGIN_ID}/config`)
      .then(({ data }: any) => {
        setUrl(data?.config?.url || null);
      })
      .catch((err: any) => {
        if ('code' in err && err?.code === 'ERR_CANCELED') {
          return;
        }
      });
  }, []);
  return <PreviewButton url={url} openTarget={model} />;
};

export default EditViewRightLinks;
