import React from "react";
import {
    Table, TableHead, TableBody, TableRow, TableCell,
    TableContainer, Paper, Typography, Box
} from "@mui/material";

type Align = "left" | "center" | "right";

type TableBlock = {
    preText?: string;
    tableBlock: string;
    italicLine?: string;
    postText?: string;
};

type ParseResult = {
    headers: string[];
    rows: string[][];
    aligns: Align[];
};

export function hasMarkdownTable(input: string): boolean {
    const lines = input.split(/\r?\n/);

    const isHeader = (line: string) => /^\s*\|.+\|\s*$/.test(line.trim());
    const isAlign = (line: string) =>
        /^\s*\|(?:\s*:?-{3,}:?\s*\|)+\s*$/.test(line.trim());

    for (let i = 0; i < lines.length - 1; i++) {
        if (isHeader(lines[i]) && isAlign(lines[i + 1])) {
            return true;
        }
    }
    return false;
}
function isMarkdownTableHeader(line: string): boolean {
    return /^\s*\|.+\|\s*$/.test(line.trim());
}

function isMarkdownAlignRow(line: string): boolean {
    return /^\s*\|(?:\s*:?-{3,}:?\s*\|)+\s*$/.test(line.trim());
}

function extractFirstTableBlock(input: string): TableBlock | null {
    const lines = input.split(/\r?\n/);

    let start = -1;
    let end = -1;

    for (let i = 0; i < lines.length; i++) {
        if (isMarkdownTableHeader(lines[i])) {
            if (i + 1 < lines.length && isMarkdownAlignRow(lines[i + 1])) {
                start = i;
                let j = i + 2;
                while (j < lines.length && /^\s*\|.*\|\s*$/.test(lines[j].trim())) j++;
                end = j - 1;
                break;
            }
        }
    }

    if (start === -1 || end === -1) return null;

    const preText = lines.slice(0, start).join("\n").trim() || undefined;
    const tableBlock = lines.slice(start, end + 1).join("\n");
    const after = lines.slice(end + 1);

    let italicLine: string | undefined;
    let postText: string | undefined;

    if (after.length) {
        const firstNonEmptyIdx = after.findIndex((l) => l.trim() !== "");
        if (firstNonEmptyIdx !== -1) {
            const maybeItalic = after[firstNonEmptyIdx].trim();
            if (/^\*.*\*$/.test(maybeItalic)) {
                italicLine = maybeItalic.replace(/^\*|\*$/g, "");
                postText = after.slice(firstNonEmptyIdx + 1).join("\n").trim() || undefined;
            } else {
                postText = after.join("\n").trim() || undefined;
            }
        }
    }

    return { preText, tableBlock, italicLine, postText };
}

/** ✅ Hàm parse bảng */
function splitRow(line: string): string[] {
    return line
        .trim()
        .slice(1, -1)
        .split("|")
        .map((s) => s.trim());
}

function parseAlignCell(cell: string): Align {
    const c = cell.trim();
    const left = c.startsWith(":");
    const right = c.endsWith(":");
    if (left && right) return "center";
    if (right) return "right";
    return "left";
}

function parseMarkdownTable(block: string): ParseResult {
    const lines = block.split(/\r?\n/).filter(Boolean);
    const headers = splitRow(lines[0]);
    const aligns = splitRow(lines[1]).map(parseAlignCell);
    const rows = lines.slice(2).map(splitRow);
    return { headers, rows, aligns };
}

function isNumericLike(value: string): boolean {
    const v = value.replace(/[\s,€$₫%]/g, "");
    return v !== "" && !isNaN(Number(v));
}

export default function MarkdownTable({ markdown }: { markdown: string }) {
    const extracted = extractFirstTableBlock(markdown);

    if (!extracted) {
        return <Typography color="error">Không tìm thấy bảng hợp lệ.</Typography>;
    }

    const { preText, tableBlock, italicLine, postText } = extracted;
    const { headers, rows, aligns } = parseMarkdownTable(tableBlock);

    return (
        <Box display="grid" gap={2}>
            {preText && <Typography whiteSpace="pre-wrap">{preText}</Typography>}

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {headers.map((h, i) => (
                                <TableCell key={i} align={aligns[i] ?? "left"} sx={{ fontWeight: 600 }}>
                                    {h}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, rIdx) => (
                            <TableRow key={rIdx}>
                                {row.map((cell, cIdx) => {
                                    const align = aligns[cIdx] ?? (isNumericLike(cell) ? "right" : "left");
                                    return (
                                        <TableCell key={cIdx} align={align}>
                                            {cell}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {italicLine && (
                <Typography variant="subtitle1" fontStyle="italic">
                    {italicLine}
                </Typography>
            )}

            {postText && <Typography whiteSpace="pre-wrap">{postText}</Typography>}
        </Box>
    );
}
