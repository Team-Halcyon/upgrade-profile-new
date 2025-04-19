"use client"

import ClassicTemplate from "./classic-template"
import ModernTemplate from "./modern-template"
import MinimalTemplate from "./minimal-template"

export default function TemplateFactory({ templateId, data }) {
  switch (templateId) {
    case "modern":
      return <ModernTemplate data={data} />
    case "minimal":
      return <MinimalTemplate data={data} />
    case "executive":
      return <ClassicTemplate data={data} /> // Use Classic as fallback
    case "tech":
      return <ModernTemplate data={data} /> // Use Modern as fallback
    case "creative":
      return <MinimalTemplate data={data} /> // Use Minimal as fallback
    case "classic":
    default:
      return <ClassicTemplate data={data} />
  }
}
