import React from "react";
import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import { ParsedResume } from "@/types/resume";

// Register premium fonts (in production download from Google Fonts or use system)
Font.register({
  family: "Inter",
  fonts: [
    { src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2" },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontFamily: "Inter",
    fontSize: 10,
    color: "#111",
    lineHeight: 1.45,
  },
  header: {
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#C5A46E",
    paddingBottom: 14,
  },
  name: { fontSize: 26, fontWeight: 600, letterSpacing: -1 },
  contact: { fontSize: 9, color: "#555", marginTop: 4 },
  section: { marginTop: 22 },
  sectionTitle: { fontSize: 11, fontWeight: 600, color: "#C5A46E", letterSpacing: 1.5, marginBottom: 8 },
  bullet: { marginLeft: 12, marginBottom: 4 },
});

interface Props {
  resume: ParsedResume;
  versionName?: string;
  isWatermarked?: boolean;
}

export const PDFResumeTemplate: React.FC<Props> = ({ resume, versionName = "Premium", isWatermarked = false }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{resume.personal.fullName}</Text>
        <Text style={styles.contact}>
          {resume.personal.email} • {resume.personal.phone} • {resume.personal.location} • {resume.personal.linkedin}
        </Text>
      </View>

      {/* Summary */}
      {resume.summary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PROFESSIONAL SUMMARY</Text>
          <Text>{resume.summary}</Text>
        </View>
      )}

      {/* Experience */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>EXPERIENCE</Text>
        {resume.experience.map((exp, i) => (
          <View key={i} style={{ marginBottom: 14 }}>
            <Text style={{ fontWeight: 600 }}>{exp.role} — {exp.company}</Text>
            <Text style={{ color: "#666", fontSize: 9 }}>{exp.startDate} — {exp.endDate || "Present"}</Text>
            {exp.bullets.map((b, bi) => (
              <Text key={bi} style={styles.bullet}>• {b}</Text>
            ))}
          </View>
        ))}
      </View>

      {/* Skills */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SKILLS</Text>
        <Text>{Array.isArray(resume.skills) ? resume.skills.join(" • ") : resume.skills}</Text>
      </View>

      {/* Education */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>EDUCATION</Text>
        {resume.education.map((ed, i) => (
          <Text key={i}>{ed.degree} — {ed.institution} ({ed.startDate}–{ed.endDate})</Text>
        ))}
      </View>

      {isWatermarked && (
        <View style={{ position: "absolute", bottom: 30, right: 50, opacity: 0.15, fontSize: 9 }}>
          <Text>VELLON AI — FREE PLAN</Text>
        </View>
      )}
    </Page>
  </Document>
);
