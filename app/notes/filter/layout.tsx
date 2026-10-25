import css from './LayoutNotes.module.css';

type LayoutSidebarProps = {
    children: React.ReactNode;
    sidebar: React.ReactNode;
};

const LayoutSidebar = ({ children, sidebar }: LayoutSidebarProps) => {
    return (
        <section className={css.container}>
            <aside className={css.sidebar}>{sidebar}</aside>
            <div className={css.notesWrapper}>{children}</div>
        </section>);
};

export default LayoutSidebar;
