#!/usr/bin/env python3
"""
Enterprise AI Adoption Metrics Framework
Tracks and reports on AI development tool adoption and ROI
"""

import json
import datetime
from typing import Dict, List, Any
from dataclasses import dataclass, asdict
from enum import Enum

class MetricType(Enum):
    PRODUCTIVITY = "productivity"
    QUALITY = "quality"
    ADOPTION = "adoption"
    FINANCIAL = "financial"
    SATISFACTION = "satisfaction"

@dataclass
class Metric:
    name: str
    type: MetricType
    value: float
    unit: str
    timestamp: datetime.datetime
    team: str = "all"
    
@dataclass
class ProductivityMetrics:
    lines_of_code_per_day: float = 0.0
    pull_requests_per_week: float = 0.0
    time_to_complete_feature: float = 0.0
    code_review_time: float = 0.0
    ai_suggestions_accepted: float = 0.0
    
@dataclass
class QualityMetrics:
    bug_density: float = 0.0
    code_coverage: float = 0.0
    security_vulnerabilities: int = 0
    technical_debt_ratio: float = 0.0
    code_duplication: float = 0.0
    
@dataclass
class AdoptionMetrics:
    teams_onboarded: int = 0
    active_users: int = 0
    ai_tool_usage_hours: float = 0.0
    features_using_ai: float = 0.0
    training_completion_rate: float = 0.0

class MetricsCollector:
    def __init__(self):
        self.metrics: List[Metric] = []
        self.baselines: Dict[str, float] = {}
        
    def set_baseline(self, metric_name: str, value: float):
        """Set baseline values for comparison"""
        self.baselines[metric_name] = value
        
    def collect_metric(self, metric: Metric):
        """Collect a single metric data point"""
        self.metrics.append(metric)
        
    def calculate_improvement(self, metric_name: str, current_value: float) -> float:
        """Calculate percentage improvement from baseline"""
        if metric_name in self.baselines:
            baseline = self.baselines[metric_name]
            if baseline > 0:
                return ((current_value - baseline) / baseline) * 100
        return 0.0
        
    def generate_report(self) -> Dict[str, Any]:
        """Generate comprehensive metrics report"""
        report = {
            "timestamp": datetime.datetime.now().isoformat(),
            "summary": self._calculate_summary(),
            "productivity": self._analyze_productivity(),
            "quality": self._analyze_quality(),
            "adoption": self._analyze_adoption(),
            "roi": self._calculate_roi(),
            "recommendations": self._generate_recommendations()
        }
        return report
        
    def _calculate_summary(self) -> Dict[str, Any]:
        """Calculate executive summary metrics"""
        total_metrics = len(self.metrics)
        improvements = []
        
        for metric in self.metrics:
            improvement = self.calculate_improvement(metric.name, metric.value)
            if improvement > 0:
                improvements.append(improvement)
                
        avg_improvement = sum(improvements) / len(improvements) if improvements else 0
        
        return {
            "total_metrics_tracked": total_metrics,
            "average_improvement": f"{avg_improvement:.1f}%",
            "metrics_improved": len(improvements),
            "data_quality_score": self._calculate_data_quality()
        }
        
    def _analyze_productivity(self) -> Dict[str, Any]:
        """Analyze productivity metrics"""
        productivity_metrics = [m for m in self.metrics if m.type == MetricType.PRODUCTIVITY]
        
        if not productivity_metrics:
            return {"status": "No productivity data available"}
            
        return {
            "lines_of_code_trend": self._calculate_trend("lines_of_code_per_day"),
            "pr_velocity": self._calculate_trend("pull_requests_per_week"),
            "ai_adoption_rate": self._calculate_ai_adoption_rate(),
            "time_savings": self._calculate_time_savings()
        }
        
    def _analyze_quality(self) -> Dict[str, Any]:
        """Analyze code quality metrics"""
        quality_metrics = [m for m in self.metrics if m.type == MetricType.QUALITY]
        
        return {
            "bug_reduction": self._calculate_trend("bug_density", inverse=True),
            "security_improvement": self._calculate_security_score(),
            "code_coverage_trend": self._calculate_trend("code_coverage"),
            "technical_debt_reduction": self._calculate_trend("technical_debt_ratio", inverse=True)
        }
        
    def _analyze_adoption(self) -> Dict[str, Any]:
        """Analyze adoption metrics"""
        adoption_metrics = [m for m in self.metrics if m.type == MetricType.ADOPTION]
        
        return {
            "teams_onboarded": self._get_latest_value("teams_onboarded"),
            "active_users": self._get_latest_value("active_users"),
            "usage_growth": self._calculate_trend("ai_tool_usage_hours"),
            "training_progress": self._get_latest_value("training_completion_rate")
        }
        
    def _calculate_roi(self) -> Dict[str, Any]:
        """Calculate return on investment"""
        # Simplified ROI calculation
        productivity_gain = self._calculate_productivity_value()
        quality_gain = self._calculate_quality_value()
        total_benefits = productivity_gain + quality_gain
        
        # Assumed costs (should be parameterized)
        tool_costs = 10000  # Monthly
        training_costs = 50000  # One-time
        infrastructure_costs = 5000  # Monthly
        
        monthly_costs = tool_costs + infrastructure_costs
        total_costs = training_costs + (monthly_costs * 12)
        
        roi = ((total_benefits - total_costs) / total_costs) * 100 if total_costs > 0 else 0
        
        return {
            "annual_benefits": f"${total_benefits:,.0f}",
            "annual_costs": f"${total_costs:,.0f}",
            "roi_percentage": f"{roi:.0f}%",
            "payback_period_months": self._calculate_payback_period(total_benefits, total_costs)
        }
        
    def _generate_recommendations(self) -> List[str]:
        """Generate actionable recommendations based on metrics"""
        recommendations = []
        
        # Check adoption rate
        adoption_rate = self._get_latest_value("active_users") / self._get_latest_value("teams_onboarded") * 100 if self._get_latest_value("teams_onboarded") > 0 else 0
        if adoption_rate < 80:
            recommendations.append("Increase training and support for teams with low adoption")
            
        # Check quality metrics
        if self._get_latest_value("bug_density") > 5:
            recommendations.append("Focus on code review practices and automated testing")
            
        # Check productivity
        if self._calculate_trend("lines_of_code_per_day") < 10:
            recommendations.append("Review AI tool configuration and provide advanced training")
            
        return recommendations
        
    def _calculate_trend(self, metric_name: str, inverse: bool = False) -> float:
        """Calculate trend for a specific metric"""
        relevant_metrics = [m for m in self.metrics if m.name == metric_name]
        if len(relevant_metrics) < 2:
            return 0.0
            
        first_value = relevant_metrics[0].value
        last_value = relevant_metrics[-1].value
        
        if first_value == 0:
            return 0.0
            
        trend = ((last_value - first_value) / first_value) * 100
        return -trend if inverse else trend
        
    def _get_latest_value(self, metric_name: str) -> float:
        """Get the most recent value for a metric"""
        relevant_metrics = [m for m in self.metrics if m.name == metric_name]
        return relevant_metrics[-1].value if relevant_metrics else 0.0
        
    def _calculate_data_quality(self) -> float:
        """Calculate data quality score based on completeness and consistency"""
        # Simplified calculation
        return 85.0  # Placeholder
        
    def _calculate_ai_adoption_rate(self) -> float:
        """Calculate AI tool adoption rate"""
        suggestions_accepted = self._get_latest_value("ai_suggestions_accepted")
        return suggestions_accepted
        
    def _calculate_time_savings(self) -> float:
        """Calculate time saved through AI assistance"""
        # Assuming 30% time savings on average
        return 30.0
        
    def _calculate_security_score(self) -> float:
        """Calculate security improvement score"""
        vulnerabilities = self._get_latest_value("security_vulnerabilities")
        # Inverse score - fewer vulnerabilities = higher score
        return max(0, 100 - (vulnerabilities * 10))
        
    def _calculate_productivity_value(self) -> float:
        """Calculate monetary value of productivity improvements"""
        # Simplified calculation based on developer time saved
        developers = 200
        avg_salary = 120000
        time_saved_percentage = 0.30
        
        return developers * avg_salary * time_saved_percentage
        
    def _calculate_quality_value(self) -> float:
        """Calculate monetary value of quality improvements"""
        # Bug reduction value + reduced maintenance costs
        bug_cost = 500  # Average cost per bug
        bugs_reduced = 1000  # Annual bug reduction
        
        return bug_cost * bugs_reduced
        
    def _calculate_payback_period(self, annual_benefits: float, total_costs: float) -> int:
        """Calculate payback period in months"""
        if annual_benefits <= 0:
            return 999  # Never
            
        monthly_benefits = annual_benefits / 12
        months = total_costs / monthly_benefits
        return int(months)

# Example usage
if __name__ == "__main__":
    collector = MetricsCollector()
    
    # Set baselines
    collector.set_baseline("lines_of_code_per_day", 50)
    collector.set_baseline("bug_density", 10)
    collector.set_baseline("teams_onboarded", 0)
    
    # Collect sample metrics
    collector.collect_metric(Metric(
        name="lines_of_code_per_day",
        type=MetricType.PRODUCTIVITY,
        value=150,
        unit="lines",
        timestamp=datetime.datetime.now(),
        team="pilot_team_1"
    ))
    
    collector.collect_metric(Metric(
        name="bug_density",
        type=MetricType.QUALITY,
        value=6,
        unit="bugs_per_kloc",
        timestamp=datetime.datetime.now()
    ))
    
    collector.collect_metric(Metric(
        name="teams_onboarded",
        type=MetricType.ADOPTION,
        value=25,
        unit="teams",
        timestamp=datetime.datetime.now()
    ))
    
    collector.collect_metric(Metric(
        name="active_users",
        type=MetricType.ADOPTION,
        value=180,
        unit="users",
        timestamp=datetime.datetime.now()
    ))
    
    collector.collect_metric(Metric(
        name="ai_suggestions_accepted",
        type=MetricType.PRODUCTIVITY,
        value=75.5,
        unit="percentage",
        timestamp=datetime.datetime.now()
    ))
    
    # Generate report
    report = collector.generate_report()
    print(json.dumps(report, indent=2)) 