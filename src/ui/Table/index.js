'use client';
import { createContext, useContext } from 'react';
import styled from 'styled-components';

// Styled Components
const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* Hide footer when it contains no child elements */
  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

// Table Context
const TableContext = createContext();

/**
 * Table Component
 * A styled and reusable table layout with context to manage grid column configuration.
 *
 * @param {string} columns - Grid template columns for the table layout.
 * @param {ReactNode} children - Content of the table (header, rows, body, etc.).
 */
function Table({ columns, children }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
}

/**
 * Header Component
 * Renders the table header with column configuration from context.
 *
 * @param {ReactNode} children - Header content.
 */
function Header({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledHeader role="row" columns={columns}>
      {children}
    </StyledHeader>
  );
}

/**
 * Row Component
 * Renders a single table row with column configuration from context.
 *
 * @param {ReactNode} children - Row content.
 */
function Row({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledRow role="row" columns={columns}>
      {children}
    </StyledRow>
  );
}

/**
 * Body Component
 * Renders the table body by iterating over provided data.
 *
 * @param {Array} data - Array of data to render rows for.
 * @param {Function} render - Function to render a row for each data item.
 */
function Body({ data, render }) {
  if (!data || data.length === 0)
    return <Empty>No data to show at the moment</Empty>;
  return <StyledBody>{data.map(render)}</StyledBody>;
}

// Component Composition
Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
