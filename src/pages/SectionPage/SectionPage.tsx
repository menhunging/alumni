import styles from "./SectionPage.module.scss";

interface SectionPageProps {
  title: string;
}

export function SectionPage({ title }: SectionPageProps) {
  return (
    <section className={styles.root}>
      <h1 className={styles.title}>{title}</h1>
    </section>
  );
}
