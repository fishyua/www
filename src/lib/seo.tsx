import { Meta, MetaProvider, Title } from "@solidjs/meta";
import { ParentProps } from "solid-js";

interface SEOProps extends ParentProps {
  title: string;
  description: string;
}
export default function SEO(props: SEOProps) {
  return (
    <MetaProvider>
      <Title>{props.title}</Title>
      <Meta property="og:title" content={props.title} />
      <Meta name="description" content={props.description} />
      <Meta property="og:description" content={props.description} />
      {props.children}
    </MetaProvider>
  );
}
