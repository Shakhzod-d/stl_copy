import styled from "styled-components";


export const TableContainer = styled.div`
    overflow: hidden;
`;

export const Column = styled.table<{
  display?: string;
}>`
    width: 100%;
    display: ${({ display = 'grid' }) => display};
    grid-template-columns: repeat(auto-fill, minmax(14%, 1fr));
    padding: 15px 25px;
`;

export const Div = styled.div`
    max-height: 250px;
    border-radius: 15px;
    background: #fff;
    margin-bottom: 20px;
    overflow-y: auto;
    position: relative;
`;

export const Department = styled.div`
    display: flex;
    border-radius: 15px 15px 0 0;
    background: #FC973A;
    padding: 10px 25px;
    justify-content: space-between;
    color: #fff;
    margin-bottom: 5px;
    position: sticky;
    top: 0px;
`;

export const Container = styled.div`
    overflow-y: auto;
`;

export const Text = styled.p<{
  color?: string;
}>`
    color: ${({ color }) => color};
    margin: 0 auto;
`;