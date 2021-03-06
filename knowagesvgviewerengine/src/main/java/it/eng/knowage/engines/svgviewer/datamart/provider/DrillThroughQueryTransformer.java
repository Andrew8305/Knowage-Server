/*
 * Knowage, Open Source Business Intelligence suite
 * Copyright (C) 2016 Engineering Ingegneria Informatica S.p.A.
 *
 * Knowage is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Knowage is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
package it.eng.knowage.engines.svgviewer.datamart.provider;

import it.eng.spagobi.tools.dataset.common.query.AbstractQueryTransformer;
import it.eng.spagobi.tools.dataset.common.query.IQueryTransformer;

public class DrillThroughQueryTransformer extends AbstractQueryTransformer {

	DataMartProvider datamartProvider;

	public DrillThroughQueryTransformer(DataMartProvider datamartProvider) {
		this(datamartProvider, null);

	}

	public DrillThroughQueryTransformer(DataMartProvider datamartProvider, IQueryTransformer previousTransformer) {
		super(previousTransformer);
		setDatamartProvider(datamartProvider);
		init();
	}

	@Override
	public Object execTransformation(Object query) {
		// do nothing. this transformer is just a composition of other transformers
		// @see the init method
		return query;
	}

	private void init() {

		IQueryTransformer queryDrillTransformer = null;

		// Iterator it;
		// String baseLevelName = datamartProvider.getMetaData().getLevelName(datamartProvider.getSelectedHierarchy().getName());
		// Hierarchy.Level baseLevel = datamartProvider.getSelectedHierarchy().getLevel(baseLevelName);
		// Set measureColumnNames = datamartProvider.getMetaData().getMeasureColumnNames();
		//
		// if (datamartProvider.getSelectedHierarchy().getType().equalsIgnoreCase("custom")) {
		//
		// // Custom hierarchy:
		// // Group by the column associated to the selected level into the custom hierarchy.
		// // Apply to each measure column the aggregation function specified in the metadata
		// // configuration block if any. Otherways use SUM.
		//
		// GroupByQueryTransformer queryGroupByTransformer;
		//
		// queryGroupByTransformer = new GroupByQueryTransformer();
		//
		// // group on the column associated to the selected level into the selected hierarchy
		// String aggregationColumnName = datamartProvider.getSelectedLevel().getColumnId();
		// queryGroupByTransformer.addGrouByColumn(aggregationColumnName);
		//
		// // aggregate on the column defined as measure in the metadata configuration block
		// it = measureColumnNames.iterator();
		// while (it.hasNext()) {
		// String measureColumnName = (String) it.next();
		// String aggregationFunction = null;
		//
		// aggregationFunction = datamartProvider.getMetaData().getAggregationFunction(measureColumnName);
		// if (StringUtilities.isEmpty(aggregationFunction)) {
		// aggregationFunction = "SUM";
		// }
		//
		// queryGroupByTransformer.addAggregateColumn(measureColumnName, aggregationFunction);
		// }
		//
		// queryGroupByTransformer.setPreviousTransformer(this.getPreviousTransformer());
		//
		// queryDrillTransformer = queryGroupByTransformer;
		// } else {
		//
		// // ==============================================================
		// // STEP1: Normalize the given query in order to have only one row
		// // in the results set for each member in the selected level
		// // --------------------------------------------------------------
		//
		// GroupByQueryTransformer normalizationQueryTransformer;
		//
		// normalizationQueryTransformer = new GroupByQueryTransformer();
		//
		// // group on the column in the given query that refers to the geographical dimension table
		// String aggregationColumnName = datamartProvider.getMetaData().getGeoIdColumnName(datamartProvider.getSelectedHierarchy().getName());
		// normalizationQueryTransformer.addGrouByColumn(aggregationColumnName);
		//
		// // aggregate on the column defined as measure in the metadata configuration block
		// it = measureColumnNames.iterator();
		// while (it.hasNext()) {
		// String measureColumnName = (String) it.next();
		// String aggregationFunction = null;
		//
		// aggregationFunction = datamartProvider.getMetaData().getAggregationFunction(measureColumnName);
		// if (StringUtilities.isEmpty(aggregationFunction)) {
		// aggregationFunction = "SUM";
		// }
		//
		// normalizationQueryTransformer.addAggregateColumn(measureColumnName, aggregationFunction);
		// }
		//
		// // normalizedSubQuery = (String)normalizationQueryTransformer.transformStatment(query);
		// // ==========================================================
		//
		// // ==============================================================
		// // STEP2: get the query used to retrive data from the geographical
		// // dimension table
		// // --------------------------------------------------------------
		// String dimGeoQuery = getDimGeoQuery();
		// // ==========================================================
		//
		// // ==============================================================
		// // STEP3: join the two query generated at setp 1 & 2
		// // --------------------------------------------------------------
		// JoinQueryTransformer joinQueryTransformer;
		//
		// joinQueryTransformer = new JoinQueryTransformer();
		//
		// // select the column associated to the selected level into the selected hierarchy
		// String aggColumnName = datamartProvider.getSelectedLevel().getColumnId();
		// joinQueryTransformer.addSelectColumn(aggColumnName);
		//
		// // select all columns defined as measure in the metadata configuration block
		// it = measureColumnNames.iterator();
		// while (it.hasNext()) {
		// String measureColumnName = (String) it.next();
		// joinQueryTransformer.addSelectColumn(measureColumnName);
		// }
		//
		// // set as joining query the one generated during step 2
		// joinQueryTransformer.setStatmentToJoin(dimGeoQuery);
		//
		// // define the join condition
		// joinQueryTransformer.setJoinCondition(datamartProvider.getMetaData().getGeoIdColumnName(datamartProvider.getSelectedHierarchy().getName()),
		// baseLevel.getColumnId());
		//
		// // joinedQuery = joinQueryTransformer.transformStatment( normalizedSubQuery );
		// // ==========================================================
		//
		// // ==============================================================
		// // STEP4:
		// // --------------------------------------------------------------
		// GroupByQueryTransformer normalizeJoinedQueryTransformer;
		//
		// normalizeJoinedQueryTransformer = new GroupByQueryTransformer();
		//
		// normalizeJoinedQueryTransformer.addGrouByColumn(datamartProvider.getSelectedLevel().getColumnId());
		//
		// // aggregate on the column defined as measure in the metadata configuration block
		// it = measureColumnNames.iterator();
		// while (it.hasNext()) {
		// String measureColumnName = (String) it.next();
		// String aggregationFunction = null;
		//
		// aggregationFunction = datamartProvider.getMetaData().getAggregationFunction(measureColumnName);
		// if (StringUtilities.isEmpty(aggregationFunction)) {
		// aggregationFunction = "SUM";
		// }
		//
		// normalizeJoinedQueryTransformer.addAggregateColumn(measureColumnName, aggregationFunction);
		// }
		//
		// // aggragateQuery = (String)normalizeJoinedQueryTransformer.transformStatment(joinedQuery);
		// // ==========================================================
		//
		// normalizeJoinedQueryTransformer.setPreviousTransformer(joinQueryTransformer);
		// joinQueryTransformer.setPreviousTransformer(normalizationQueryTransformer);
		// normalizationQueryTransformer.setPreviousTransformer(this.getPreviousTransformer());
		//
		// queryDrillTransformer = normalizeJoinedQueryTransformer;
		// }
		//
		// this.setPreviousTransformer(queryDrillTransformer);
	}

	/**
	 * Gets the dim geo query.
	 *
	 * @return the dim geo query
	 */
	private String getDimGeoQuery() {
		String query = "";

		// Hierarchy hierarchy = datamartProvider.getSelectedHierarchy();
		// String baseLevelName = datamartProvider.getMetaData().getLevelName(hierarchy.getName());
		// Hierarchy.Level baseLevel = hierarchy.getLevel(baseLevelName);
		//
		// List levels = hierarchy.getSublevels(baseLevel.getName());
		//
		// query += "SELECT " + baseLevel.getColumnId();
		// for (int i = 0; i < levels.size(); i++) {
		// Hierarchy.Level subLevel;
		// subLevel = (Hierarchy.Level) levels.get(i);
		// query += ", " + subLevel.getColumnId();
		// }
		// query += " FROM " + hierarchy.getTable();
		// query += " GROUP BY " + baseLevel.getColumnId();
		// for (int i = 0; i < levels.size(); i++) {
		// Hierarchy.Level subLevel;
		// subLevel = (Hierarchy.Level) levels.get(i);
		// query += ", " + subLevel.getColumnId();
		// }

		return query;

	}

	public DataMartProvider getDatamartProvider() {
		return datamartProvider;
	}

	public void setDatamartProvider(DataMartProvider datamartProvider) {
		this.datamartProvider = datamartProvider;
	}
}
